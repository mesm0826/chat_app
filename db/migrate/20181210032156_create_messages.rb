class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :from_user_id
      t.integer :to_user_id
      t.string :picture

      t.timestamps null: false
    end
  end
end
