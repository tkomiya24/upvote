# frozen_string_literal:false

class AddRandomStringToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :auth_string, :string
    add_column :users, :auth_code, :string
    add_index :users, :auth_string
  end
end
