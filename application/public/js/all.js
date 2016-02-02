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

app.controller('homeController', function($http, homeService) {
   vm = this;
   homeService.userObj().then(function success(response) {
      var email = response.data.local.email;
      vm.username = email.substring(0,email.indexOf("@"));
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