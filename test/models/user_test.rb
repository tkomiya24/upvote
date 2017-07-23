# frozen_string_literal:false

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  UPVOTES_API_URL = 'https://oauth.reddit.com/user/takeru/upvoted'.freeze

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

  test 'fetch_upvotes successful retrieval with less than 100 results' do
    response = mock
    response.stubs(:body).returns({
      data: {
        children: [
          {
            id: 1
          },
          {
            id: 2
          }
        ]
      }
    }.to_json)
    user = users(:takeru)
    stub_api(UPVOTES_API_URL, response, params: { type: 'links', limit: 100 },
                                        Authorization: "Bearer #{user.auth_token}")
    RedditDatum.expects(:from_json_array).once.with(user, [{ 'id' => 2 }, { 'id' => 1 }])
               .returns(true)

    user.fetch_upvotes
  end

  test 'fetch_upvotes successful retrieval with more than 100 results' do
    response = mock
    children = []
    101.times do |i|
      children.push('data' => { 'id' => i })
    end
    response2 = mock
    children2 = [{ 'data' => { 'id' => 101 } }]

    response.stubs(:body).returns({ 'data' => { 'children' => children } }.to_json)
    response2.stubs(:body).returns({ 'data' => { 'children' => children2 } }.to_json)
    user = users(:takeru)
    expected_authorization = "Bearer #{user.auth_token}"
    stub_api(UPVOTES_API_URL, response, params: { type: 'links', limit: 100 },
                                        Authorization: expected_authorization)
    stub_api(UPVOTES_API_URL, response2, params: { type: 'links', limit: 100, after: 't3_100' },
                                         Authorization: expected_authorization)

    RedditDatum.expects(:from_json_array).once.with(user, children2 + children.reverse)
               .returns(true)

    user.fetch_upvotes
  end

  def stub_api(url, response, params)
    RestClient.expects(:get).with(url, params).once.returns(response)
  end
end
