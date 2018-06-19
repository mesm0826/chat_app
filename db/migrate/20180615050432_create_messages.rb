class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :message
      t.integer :user_id_from
      t.integer :user_id_to

      t.timestamps null: false
    end
  end
end
