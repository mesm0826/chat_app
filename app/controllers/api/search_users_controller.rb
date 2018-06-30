class Api::SearchUsersController < ApplicationController
  def index
    search_string = params[:search_string]
    if search_string.blank?
      @search_users = []
    else
      @search_users = User.where('name like(?)', "%#{search_string}%")
    end
    debugger
    render json: {
      search_users: @search_users,
    }
  end
end
