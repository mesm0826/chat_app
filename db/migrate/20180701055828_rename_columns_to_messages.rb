class RenameColumnsToMessages < ActiveRecord::Migration
  def change
    rename_column :messages, :user_id_from, :from_user_id
    rename_column :messages, :user_id_to, :to_user_id
  end
end
