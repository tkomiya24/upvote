# frozen_string_literal:true

require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test 'should return a 500 if OAuth callback is called with unknown state' do
    get reddit_authorized_callback_users_url, params: { code: '123', state: 'abc' }, xhr: true

    assert_response :redirect
    assert_redirected_to '/authorization_error'
  end
end
