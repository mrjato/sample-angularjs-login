'use strict';

angular.module('Home')

  .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'PATHS',
      function ($scope, $rootScope, $location, AuthenticationService, PATHS) {
        // reset login status
        AuthenticationService.clearCredentials();

        $scope.login = function () {
          $scope.dataLoading = true;

          AuthenticationService.login($scope.username, $scope.password, function (response) {
            if (response.status === 200) {
              AuthenticationService.setCredentials($scope.username, $scope.password);
              $location.path(PATHS.HOME);
            } else {
              AuthenticationService.clearCredentials();
              $scope.dataLoading = false;

              if (response.status === 401) {
                $scope.error = 'Invalid username or password';
              } else {
                $scope.error = 'Can\'t access server';
              }
            }
          });
        };
      }
    ]);
