var app = angular.module('posting', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../html/welcome.html"
    })
    .when("/loginpage", {
      templateUrl: "../html/login.html"
    })
    .when("/joinpage", {
      templateUrl: "../html/join.html"
    })
    .when("/home", {
      templateUrl: "../html/home.html",
      controller: "homeController",
      controllerAs: "home"
    })
  }
]);

app.controller('homeController', function($http, userService, postService) {
  vm = this;
  userService.userObj().then(
    function success(response) {
      var email = response.data.local.email;
      vm.username = email.substring(0,email.indexOf("@"));
    }
  );
  postService.postObj().then(
    function success(response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
      };
      console.log(response.data[0]);
      vm.poster = response.data[0].username;
      console.log('USERNAME in ANGULAR: ' + response.data[0].username);
      vm.posts = response.data[0].postContent;
      console.log('POSTS in ANGULAR: ' + response.data[0].username);
    }
  );
});

angular.module('posting').factory('userService', function($http) {
  var getUser = function() {
    return $http({
      method: 'POST',
      url: '/user'
    });
  }
  return {
    userObj: function() {
      return getUser();
    }
  };
});

angular.module('posting').factory('postService', function($http) {
  var getPosts = function() {
    return $http({
      method: 'GET',
      url: '/posts'
    });
  }
  return {
    postObj: function() {
      return getPosts();
    }
  };
});