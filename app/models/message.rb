class Message < ActiveRecord::Base
  belongs_to :user
  mount_uploader :picture, PictureUploader
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true
  validates :content, length: { maximum: 140 }
end
