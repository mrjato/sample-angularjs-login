'use strict';

angular.module('Home')
  .controller('LogoutController',
    ['$location', 'AuthenticationService', 'PATHS',
      function ($location, AuthenticationService, PATHS) {
        AuthenticationService.clearCredentials();
        $location.path(PATHS.LOGIN);
      }
    ]
  );
