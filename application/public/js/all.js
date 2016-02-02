var app = angular.module('posting', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../html/welcome.html",
      controller: "welcomeController",
      controllerAs: "welcome"
    })
    .when("/loginpage", {
      templateUrl: "../html/login.html",
      controller: "loginpageController",
      controllerAs: "loginpage"
    })
    .when("/joinpage", {
      templateUrl: "../html/join.html",
      controller: "joinController",
      controllerAs: "join"
    })
    .when("/home", {
      templateUrl: "../html/home.html",
      controller: "homeController",
      controllerAs: "home"
    })
  }
]);

app.controller('welcomeController', function() {
     vm = this;
   }
 );
app.controller('joinController', function() {
     vm = this;
   }
 );
app.controller('loginpageController', function() {
     vm = this;
   }
 );
app.controller('homeController', function($http, homeService) {
     vm = this;
     homeService.userObj().then(function success(response) {
        vm.user = response.data;
      });
   }
 );

angular.module('posting').factory('homeService', function($http) {
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