# frozen_string_literal:false

require 'securerandom'
require 'rest-client'

class UsersController < ActionController::Base
  before_action :authenticate_user!
  TYPE = 'code'.freeze
  URI = 'http://localhost:3000/users/reddit_authorized_callback'.freeze
  DURATION = 'permanent'.freeze
  SCOPE_STRING = 'history'.freeze
  AUTH_URL = 'https://www.reddit.com/api/v1/authorize'
             .concat("?client_id=#{ENV['CLIENT_ID']}&response_type=#{TYPE}")
             .concat("&state=%s&redirect_uri=#{URI}")
             .concat("&duration=#{DURATION}&scope=#{SCOPE_STRING}")

  ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'.freeze
  RestClient.log = Logger.new(STDOUT)

  def authorize_reddit
    random_string = SecureRandom.hex
    if current_user.update(auth_string: random_string)
      redirect_to create_redirect_url(random_string)
    else
      render(json: {}, status: :internal_server_error)
    end
  end

  def reddit_authorized_callback
    user = User.where(auth_string: params[:state]).first
    return handle_error unless params[:code]
    return handle_not_found unless user
    begin
      access_token = get_authorization_token(params[:code])
    rescue RestClient::ExceptionWithResponse => e
      return render(json: e.response)
    end
    if user.update(auth_token: access_token, auth_string: nil)
      redirect_to('/authorized')
    else
      render(json: { message: 'Could not update your user. Please try again later' }, status: 500)
    end
  end

  private

  def get_authorization_token(code)
    payload = {
      'grant_type' => 'authorization_code',
      'code' => code,
      'redirect_uri' => URI
    }
    resource = RestClient::Resource.new(ACCESS_TOKEN_URL, ENV['CLIENT_ID'], ENV['CLIENT_SECRET'])
    response = resource.post payload
    JSON.parse(response.body)['access_token']
  end

  def handle_error
    render(json: { message: 'There was an error trying to authorize your Reddit account' },
           status: :internal_server_error)
  end

  def create_redirect_url(random_string)
    sprintf(AUTH_URL, random_string)
  end
end
