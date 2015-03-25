'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
      $scope.searchText = '';

      $scope.fulltextsearch = function () {

        $http.get('http://localhost:4567/fulltext?text=' + $scope.searchText).
            success(function (data, status, headers, config) {
              //console.log(data);
              $scope.events = data;
              angular.forEach(data, function (value, key) {
                console.log(value);

              });
            });

      };
}]);