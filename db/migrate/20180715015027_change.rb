class Change < ActiveRecord::Migration
  def change
    change_column :users, :image_name, :string
  end
end
