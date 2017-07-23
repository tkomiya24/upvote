# frozen_string_literal:false

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  UPVOTES_API_URL = 'https://oauth.reddit.com/user/takeru/upvoted'.freeze

  test 'fetch username and update model with value' do
    new_username = 'Namey McNameface'
    expected_url = 'https://oauth.reddit.com/api/v1/me'
    stub_api(expected_url, { 'name' => new_username }.to_json,
             Authorization: "Bearer #{users(:takeru).auth_token}")

    users(:takeru).fetch_username

    users(:takeru).reload
    assert_equal new_username, users(:takeru).reddit_username
  end

  test 'fetch_upvotes successful retrieval with less than 100 results' do
    response = create_mock_response_object(
      create_mock_upvotes_response(create_mock_upvote_data_with_range(1..2))
    )

    user = users(:takeru)
    stub_api(UPVOTES_API_URL, response, params: { type: 'links', limit: 100 },
                                        Authorization: "Bearer #{user.auth_token}")
    RedditDatum.expects(:from_json_array).once.with(user, create_mock_upvote_data_with_range(1..2).reverse)
               .returns(true)

    user.fetch_upvotes
  end

  test 'fetch_upvotes successful retrieval with more than 100 results' do
    children = create_mock_upvote_data_with_range((1..100))
    children2 = create_mock_upvote_data_with_range((101..102))
    response = create_mock_response_object(create_mock_upvotes_response(children))
    response2 = create_mock_response_object(create_mock_upvotes_response(children2))

    user = users(:takeru)
    expected_authorization = "Bearer #{user.auth_token}"
    stub_api(UPVOTES_API_URL, response, params: { type: 'links', limit: 100 },
                                        Authorization: expected_authorization)
    stub_api(UPVOTES_API_URL, response2, params: { type: 'links', limit: 100, after: 't3_100' },
                                         Authorization: expected_authorization)

    RedditDatum.expects(:from_json_array).once.with(user, children2.reverse + children.reverse)
               .returns(true)

    user.fetch_upvotes
  end

  test 'fetch_new_upvotes with more than 100 results' do
    user = users(:takeru)
    response = create_mock_response_object(
      create_mock_upvotes_response(create_mock_upvote_data_with_range((1..100)).reverse)
    )
    response2 = create_mock_response_object(
      create_mock_upvotes_response(create_mock_upvote_data_with_range((101..105)).reverse)
    )
    mock_reddit_datum = mock
    mock_reddit_datum.stubs(:raw_json).returns('data' => { 'id' => 25 })

    mock_query_results = mock
    mock_query_results.stubs(:last).returns(mock_reddit_datum)
    mock_query_results.stubs(:empty?).returns(false)

    user.stubs(:reddit_data).returns(mock_query_results)

    expected_authorization = "Bearer #{user.auth_token}"
    stub_api(UPVOTES_API_URL, response, params: { type: 'links', limit: 100, before: 't3_25' },
                                        Authorization: expected_authorization)
    stub_api(UPVOTES_API_URL, response2, params: { type: 'links', limit: 100, before: 't3_100' },
                                         Authorization: expected_authorization)

    RedditDatum.expects(:from_json_array)
               .with(user, create_mock_upvote_data_with_range(1..105))
               .once.returns(true)

    user.fetch_new_upvotes
  end

  def stub_api(url, response, params)
    RestClient.expects(:get).with(url, params).once.returns(response)
  end

  def create_mock_upvote_data_with_range(range)
    range.map do |i|
      create_mock_upvote_data i
    end
  end

  def create_mock_upvotes_response(upvotes)
    { 'data' => { 'children' => upvotes } }
  end

  def create_mock_response_object(body)
    response = mock
    response.stubs(:body).returns(body.to_json)
    response
  end

  def create_mock_upvote_data(id)
    { 'data' => { 'id' => id } }
  end
end
