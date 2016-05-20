'use strict';

angular.module('Home')
  .controller('MainController', ['$scope', 'AuthenticationService',
    function ($scope, AuthenticationService) {
      $scope.username = AuthenticationService.getUsername();
    }]);
