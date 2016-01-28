var app = angular.module('posting', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../html/login.html",
      controller: "loginpageController",
      controllerAs: "loginpage"
    });
  }
]);

app.controller('loginpageController', function() {
     vm = this;
   }
 );