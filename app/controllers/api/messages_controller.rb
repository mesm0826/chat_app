class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: {
      messages: @messages,
    }
  end
  def create
    content = params[:message]
    user_id_from = params[:user_id_from]
    Message.create(content: content, user_id_from: user_id_from)
    redirect_to root_path
  end
end
