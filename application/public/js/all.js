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

function timeSince(timeStamp) {
  timeStamp = new Date(timeStamp);
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
    return parseInt(secondsPast) + 's';
  }
  if(secondsPast < 3600){
    return parseInt(secondsPast/60) + 'm';
  }
  if(secondsPast <= 86400){
    return parseInt(secondsPast/3600) + 'h';
  }
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
  }
}

//Controller---------------------------------------------------
app.controller('homeController', function($http, userService, postService, searchService) {
  vm = this;
  userService.userObj().then(
    function success(response) {
      var email = response.data.local.email;
      vm.username = email;
    }
  );
  postService.postObj().then(
    function success(response) {
      var postArray = response.data;
      for (var i = 0; i < postArray.length; i++) {
        postArray[i].timeFromToday = timeSince(postArray[i].dateCreated);
      };
      vm.postList = postArray;
    }
  );

  vm.runSearch = function() {
    console.log('running search on ' + vm.searchTerm);
    searchService.searchObj().then(
      function success(response) {
        var searchArray = response.data;
        for (var i = 0; i < searchArray.length; i++) {
          searchArray[i].timeFromToday = timeSince(searchArray[i].dateCreated);
        };
        vm.postList = searchArray;
        if(searchArray.length === 0) {
          vm.searchErr = 'No results were found. Please try another search.';
        }
        else {
          vm.searchErr = '';
        };
      }
    );
    vm.searchTerm = '';
  };

  vm.findUser = function(username) {
    vm.searchTerm = username;
    console.log('clicked on' + vm.searchTerm)
    vm.runSearch();
  }
});

//Services---------------------------------------------------
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

angular.module('posting').factory('searchService', function($http) {
  var submit = function() {
    var mySearchObj = {}
    if(vm.searchTerm == '') {
      mySearchObj = {}
    }
    else {
      if(vm.searchTerm.indexOf('@') == 0) {
        var condensedSrch = vm.searchTerm.substring(1);
        mySearchObj = {'username': condensedSrch};
      }
      else if(vm.searchTerm.indexOf('#') == 0) {
        var condensedSrch = vm.searchTerm.substring(1);
        mySearchObj = {'hashtags': condensedSrch};
      }
      else {
        mySearchObj = {$or: [{'hashtags': vm.searchTerm},{'username': vm.searchTerm}]};
      };
    };
    return $http({
      method: 'POST',
      url: '/search',
      data: {searchObj: mySearchObj}
    });
  }
  return {
    searchObj: function() {
      return submit();
    }
  };
});