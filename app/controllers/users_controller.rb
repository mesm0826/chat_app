class UsersController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def show
    @user = User.find(params[:id])
    @current_user = current_user
  end

  def edit
    @user = User.find(params[:id])
  end

  def search
    @current_user = current_user
  end

end
