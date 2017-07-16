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
    response = RestClient.get "#{HISTORY_URL}/#{reddit_username}/upvoted",
                              Authorization: "Bearer #{auth_token}"
    upvotes = JSON.parse(response.body)['data']['children']
    raise "Couldn't save JSON's" unless RedditDatum.from_json_array(self, upvotes)
    upvotes
  end
end
