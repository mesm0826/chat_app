class Api::SearchUsersController < ApplicationController
  def index
    search_string = params[:search_string]
    if search_string.blank?
      @search_users = []
    else
      from_user_ids =
        "SELECT users.id FROM users INNER JOIN friendships ON users.id = friendships.to_user_id WHERE friendships.from_user_id = :user_id"
      to_user_ids =
        "SELECT users.id FROM users INNER JOIN friendships ON users.id = friendships.from_user_id WHERE friendships.to_user_id = :user_id"
      # 自分と既に友達になっているユーザー以外を抽出
      @search_users = User.where("name like(?)", "%#{search_string}%")
                          .where.not("id IN (#{from_user_ids}) OR id IN (#{to_user_ids})", user_id: current_user.id)
                          .where.not(id: current_user.id)

    end
    render json: {
      search_users: @search_users,
    }
  end
end
