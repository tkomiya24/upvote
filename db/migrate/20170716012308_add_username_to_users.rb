# frozen_string_literal:false

class AddUsernameToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :reddit_username, :string
  end
end
