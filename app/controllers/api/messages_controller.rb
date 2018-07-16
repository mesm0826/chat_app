class Api::MessagesController < ApplicationController
  def index
    openChatUserID = params[:openChatUserID]
    my_message_ids = 
        "SELECT id FROM messages WHERE from_user_id = :openChatUserID AND to_user_id = :current_user_id"
    your_message_ids = 
        "SELECT id FROM messages WHERE from_user_id = :current_user_id AND to_user_id = :openChatUserID"
    @messages = Message.where("id IN (#{my_message_ids}) OR id IN (#{your_message_ids})",
                              current_user_id: current_user.id, openChatUserID: openChatUserID)
    render json: {
      messages: @messages,
    }
  end
  def create
    content = params[:message]
    to_user_id = params[:to_user_id]
    from_user_id = current_user.id
    message = Message.create(content: content, from_user_id: from_user_id, to_user_id: to_user_id)
    render json: message
  end
  def save_image
    image = params[:image]
    to_user_id = params[:to_user_id]
    from_user_id = current_user.id
    message = Message.create(from_user_id: from_user_id, to_user_id: to_user_id, picture: image)
    render json: message
  end

end
