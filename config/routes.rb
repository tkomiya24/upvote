# frozen_string_literal: true

Rails.application.routes.draw do
  root 'application#index'
  match '*path', to: 'application#index', via: :get
end
