class UsersController < ApplicationController
  def index
    if params[:email] && params[:password]
      response = {}
      @user = User.where("email = ? AND password = ?", params[:email], params[:password])
      if @user.length > 0
        response[:data] = @user.last
        response[:message] = "sucesss"
        render json: response
      else
        response[:message] = "error"
        render json: response
      end
    end
  end

  def show
      # @user = User
  end

  def create
    @user = User.new(user_params)
    response  = {}
    if @user.save
      response[:data] = @user
    else
      response[:data] = @user
      response[:message] = 'Unprocessible entity.'
    end
    render json: response
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
