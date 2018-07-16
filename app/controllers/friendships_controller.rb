class FriendshipsController < ApplicationController
  before_action :authenticate_user!
  def destroy
    target_user_id = params[:id]
    friendship = Friendship.where("(from_user_id = :target_user_id AND to_user_id = :current_user_id) OR
                                   (from_user_id = :current_user_id AND to_user_id = :target_user_id)",
                                   target_user_id: target_user_id,
                                   current_user_id: current_user.id)
    Friendship.destroy(friendship)
    user = User.find_by(id: current_user.id)
    @friendList = user.friends
    render json: {
      friendList: @friendList,
    }
  end
end
