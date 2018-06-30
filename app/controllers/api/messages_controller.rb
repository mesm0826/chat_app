class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: {
      messages: @messages,
    }
  end
  def create
    content = params[:message]
    user_id_to = params[:user_id_to]
    user_id_from = current_user.id
    Message.create(content: content, user_id_from: user_id_from, user_id_to: user_id_to)
    redirect_to root_path
  end
end
