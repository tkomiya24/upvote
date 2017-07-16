# frozen_string_literal:false

class RenameAuthCodeColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :auth_code, :auth_token
  end
end
