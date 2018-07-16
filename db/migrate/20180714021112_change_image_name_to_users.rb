class ChangeImageNameToUsers < ActiveRecord::Migration
  def change
    change_column :users, :image_name, :string, default: "default_image.jpg"
  end
end
