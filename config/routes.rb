Rails.application.routes.draw do
  # resources :comments
  # resources :posts
  # resources :likes
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :users
    # resources :posts
    get 'get_all_posts' => 'posts#getAllPosts'
    post 'posts' => 'posts#create'
    post 'comments' => 'comments#create'
    post 'likes' => 'likes#create'
    root :to => 'users#index'
    get '*path' => 'users#index'

end
