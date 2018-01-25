class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  # GET /comments
  # GET /comments.json
  def index
    @comments = Comment.all
  end

  def create
    @comment = Comment.new(comment_params)
    response = {}
    if @comment.save
      response[:data] = Comment.all
      response[:message] = "successfully created"
    else
      response[:message] = "error"
    end
    render json: response
  end


  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
     params.require(:comment).permit(:description, :user_id, :post_id)
   end

end
