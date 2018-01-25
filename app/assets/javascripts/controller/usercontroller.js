/**
  * @ngdoc function
  * @name components.analysis.controller:DetailsAnalysisPracticeController
  * @desc desc
  **/
  (function() {
    'use strict';

    angular
    .module('angularRailsStuff')
    .controller('usersCtrl', usersCtrl);

    function usersCtrl($scope, $http, $location, $localStorage) {
      var $ctrl = this;
      onInit();

      function onInit() {
        if ($localStorage.current_user.id) {
          $scope.current_user = $localStorage.current_user;
          getAllPosts();
        }
      }

      function getAllPosts(){
        $http({
          method: 'GET',
          url: '/get_all_posts'
        }).then(function successCallback(response) {
          console.log("sssssssssssssss", response)
          if (response.data.message == "error") {
          }else{
            $scope.posts = response.data;
          }
        }, function errorCallback(response) {

        });
      }

      $scope.register = function(user){
        $http({
          method: 'POST',
          url: '/users/',
          data : {user: user}
        }).then(function successCallback(response) {
          if (response.status == 200) {
            $localStorage.current_user = response.data;
            $location.path('/');
          }
        }, function errorCallback(response) {

        });
      }

      $scope.login = function(user){
        $http({
          method: 'GET',
          url: '/users',
          params: {email: user.email, password: user.password}
        }).then(function successCallback(response) {
          if (response.data.message == "error") {
            $scope.error_message = "Invalid username or password"
          }else{
            $scope.error_message = '';
            $localStorage.current_user = response.data.data;
            $location.path('/posts');
          }
        }, function errorCallback(response) {

        });
      }

      $scope.logout = function(){
        $localStorage.current_user = {};
        $location.path('/');
      }

      $scope.submitPost = function(post){
        $http({
          method: 'POST',
          url: '/posts/',
          data : {description: post, user_id: $scope.current_user.id}
        }).then(function successCallback(response) {
          getAllPosts();
          $scope.post = '';
        }, function errorCallback(response) {

        });
      }

      $scope.addComment = function(comment,id){
        $http({
          method: 'POST',
          url: '/comments/',
          data : {description: comment, user_id: $scope.current_user.id, post_id: id}
        }).then(function successCallback(response) {
            console.log("comment", response)
            getAllPosts()
        }, function errorCallback(response) {

        });
      }

      $scope.like = function(id){
        // alert("came")
        $http({
          method: 'POST',
          url: '/likes/',
          data : {user_id: $scope.current_user.id, post_id: id}
        }).then(function successCallback(response) {
            console.log("comment", response)
            getAllPosts()
            if (response.data.like == 'disliked') {

            }else{
              
            }
        }, function errorCallback(response) {

        });
      }

      $scope.getClassName = function(likes){
        if (likes.length > 0) {
          for (var i = likes.length - 1; i >= 0; i--) {
            if(likes[i].user_id == $scope.current_user.id){
              return 'liked';
            }
          }
        }
        return '';
      }

    }

  })();
