# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :users, only: [] do
    get 'reddit_authorized_callback', on: :collection
  end
  resource :user, only: [] do
    get 'authorize_reddit', on: :member
  end
  root 'application#index'
  match '*path', to: 'application#index', via: :get
end
