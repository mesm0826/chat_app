class Api::UsersController < ApplicationController

  def index
    user = User.find_by(id: current_user.id)
    @friendList = user.friends
    render json: {
      friendList: @friendList,
    }
  end

  def create
    targetUserName = params[:targetUserName]
    to_user = User.find_by(name: targetUserName)
    to_user_id = to_user.id
    from_user_id = current_user.id
    friendship = Friendship.create(to_user_id: to_user_id, from_user_id: from_user_id)
    render json: friendship
  end
end
