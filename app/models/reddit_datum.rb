# frozen_string_literal:false

class RedditDatum < ApplicationRecord
  belongs_to :user

  def self.from_json_array(user, json_array)
    upvotes = json_array.map do |reddit_datum|
      logger.info(reddit_datum)
      {
        user: user,
        raw_json: reddit_datum
      }
    end
    create(upvotes)
  end
end
