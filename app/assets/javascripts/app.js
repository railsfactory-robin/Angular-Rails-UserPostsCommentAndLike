var app = angular.module('angularRailsStuff', [
  'ngRoute',
  'templates',
  'ngStorage'
  ]);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "index.html",
      controller: 'usersCtrl'
    })
    .when("/signup", {
        templateUrl : "signup.html",
        controller: 'usersCtrl'
    })
    .when("/posts", {
        templateUrl : "posts.html",
        controller: 'usersCtrl'
    })
    .otherwise({
        redirectTo: 'public/404'
    });
    // user the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
