# frozen_string_literal:false

require 'securerandom'
require 'rest-client'

class UsersController < ActionController::Base
  before_action :authenticate_user!
  TYPE = 'code'.freeze
  URI = 'http://localhost:3000/users/reddit_authorized_callback'.freeze
  DURATION = 'permanent'.freeze
  SCOPE_STRING = 'history identity'.freeze
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
    return handle_missing_code_error unless params[:code]
    return handle_not_found unless user
    begin
      access_token = get_authorization_token(params[:code])
    rescue RestClient::ExceptionWithResponse => e
      return render(json: e.response.body)
    end
    update_user_and_redirect(user, access_token)
  end

  def upvotes
    upvotes = current_user.reddit_data.map do |datum|
      datum.as_json(only: [:raw_json])['raw_json']
    end
    render(json: upvotes)
  end

  def archive_new
    current_user.fetch_new_upvotes
    render(json: { message: 'Success!' }, status: 200)
  rescue StandardError => e
    render(json: { message: e }, status: 500)
  end

  private

  def handle_missing_code_error
    render(json: { message: 'There was trouble retrieving authorization from the Reddit server' },
           status: 500)
  end

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

  def update_user_and_redirect(user, access_token)
    if user.update(auth_token: access_token, auth_string: nil)
      redirect_to('/authorized')
    else
      render(json: { message: 'Could not update your user. Please try again later' }, status: 500)
    end
  end

  def handle_error
    render(json: { message: 'There was an error trying to authorize your Reddit account' },
           status: :internal_server_error)
  end

  def create_redirect_url(random_string)
    sprintf(AUTH_URL, random_string)
  end
end
