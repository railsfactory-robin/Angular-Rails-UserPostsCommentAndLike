class LikesController < ApplicationController
  before_action :set_like, only: [:show, :edit, :update, :destroy]

  # GET /likes
  # GET /likes.json
  def index
    @likes = Like.all
  end

  def create
    # binding.pry
    response = {}
    status = Like.where("post_id = ? AND user_id = ?", params[:post_id], params[:user_id]).count;
    if status < 1
      @like = Like.new(like_params)
      if @like.save
        response[:data] = Like.all
        response[:message] = "successfully created"
        response[:like] = "liked"
      else
        response[:message] = "error"
      end
    else
      response[:like] = "disliked"
      Like.where("post_id = ? AND user_id = ?", params[:post_id], params[:user_id]).destroy_all
    end
    render json: response
  end


  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def like_params 
     params.require(:like).permit(:description, :user_id, :post_id)
   end

 end
