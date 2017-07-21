# frozen_string_literal:true

require 'rest-client'

class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  BASE_URL = 'https://oauth.reddit.com'
  IDENTITY_URL = "#{BASE_URL}/api/v1/me"
  HISTORY_URL = "#{BASE_URL}/user"

  has_many :reddit_data

  def fetch_username
    response = RestClient.get IDENTITY_URL, Authorization: "Bearer #{auth_token}"
    logger.info(response)
    update(reddit_username: JSON.parse(response)['name'])
  end

  def fetch_upvotes
    limit = 100
    upvotes = []
    after = ''
    loop do
      params = { type: 'links', limit: limit }
      params[:after] = after unless after.blank?
      response = RestClient.get "#{HISTORY_URL}/#{reddit_username}/upvoted",
                                params: params,
                                Authorization: "Bearer #{auth_token}"
      new_upvotes = JSON.parse(response.body)['data']['children']
      logger.info(new_upvotes)
      upvotes.push(*new_upvotes)
      break if new_upvotes.length < limit
      after = "t3_#{upvotes.last['data']['id']}"
      puts "After is now: #{after}"
    end
    raise "Couldn't save JSON's" unless RedditDatum.from_json_array(self, upvotes.reverse_each)
  end
end
