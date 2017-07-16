class CreateRedditData < ActiveRecord::Migration[5.1]
  def change
    create_table :reddit_data do |t|
      t.json :raw_json, null: false
      t.references :user
      t.timestamps
    end
  end
end
