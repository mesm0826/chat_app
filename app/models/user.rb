class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :messages, class_name: 'Message', :foreign_key => 'from_user_id', :dependent =>:destroy
  has_many :friendships_of_from_user, :class_name => 'Friendship', :foreign_key => 'from_user_id', :dependent => :destroy
  has_many :friendships_of_to_user, :class_name => 'Friendship', :foreign_key => 'to_user_id', :dependent => :destroy
  has_many :friends_of_from_user, :through => :friendships_of_from_user, :source => 'to_user'
  has_many :friends_of_to_user, :through => :friendships_of_to_user, :source => 'from_user'
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  mount_uploader :image_name, ImageUploader
  validates :name,  presence: true, length: { maximum: 50 }
  validate  :image_size

  def friends
     friends_of_from_user + friends_of_to_user
  end

  private
    # アップロード画像のサイズを検証する
    def image_size
      if image_name.size > 5.megabytes
        errors.add(:image_name, "should be less than 5MB")
      end
    end
end
