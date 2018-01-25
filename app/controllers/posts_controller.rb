class PostsController < ApplicationController

  def index
  end

  def getAllPosts
    post_data = []
    posts = Post.includes(:user, :comments, :likes)
    posts.each do |post|
      post_data << post.as_json.merge({user: post.user, comments: post.comments, likes: post.likes})
    end
    render json: post_data
  end

  def create
    @post = Post.new(post_params)
    response = {}
    if @post.save
      response[:data] = Post.all
      response[:message] = "successfully created"
    else
      response[:message] = "error"
    end
    render json: response
  end


  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
     params.require(:post).permit(:description, :user_id)
   end
 end
