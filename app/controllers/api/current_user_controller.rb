class Api::CurrentUserController < ApplicationController
  def index
    @current_user = current_user
    render json: {
      current_user: @current_user,
    }
  end
end
