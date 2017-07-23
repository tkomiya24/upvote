# frozen_string_literal:false

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'fetch username and update model with value' do
    new_username = 'Namey McNameface'
    expected_authorization = "Bearer #{users(:takeru).auth_token}"
    expected_url = 'https://oauth.reddit.com/api/v1/me'
    RestClient.expects(:get).with(expected_url, Authorization: expected_authorization).once
              .returns({
                'name' => new_username
              }.to_json)

    users(:takeru).fetch_username

    users(:takeru).reload
    assert_equal new_username, users(:takeru).reddit_username
  end
end
