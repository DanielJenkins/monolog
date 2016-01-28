var app = angular.module('posting', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../html/login.html",
      controller: "loginpageController",
      controllerAs: "loginpage"
    })
    .when("/join", {
      templateUrl: "../html/join.html",
      controller: "joinController",
      controllerAs: "join"
    });
  }
]);

app.controller('loginpageController', function() {
     vm = this;
   }
 );

app.controller('joinController', function() {
     vm = this;
   }
 );