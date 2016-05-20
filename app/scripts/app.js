'use strict';

angular.module('Home', [
  'ngRoute',
  'ngCookies'
])
  .constant('BACKEND', {
    PATH: 'http://localhost:9080/grimoire/rest/',
    API: 'http://localhost:9080/grimoire/rest/api/',
    LOGIN: 'http://localhost:9080/grimoire/rest/api/users/',
    OPTIONS: 'http://localhost:9080/grimoire/rest/api/users'
  })
  .constant('PATHS', {
    LOGIN: '/login',
    LOGOUT: '/logout',
    HOME: '/'
  })

  .config(['$routeProvider', 'PATHS',
    function ($routeProvider, PATHS) {
      $routeProvider
        .when(PATHS.LOGIN, {
          controller: 'LoginController',
          templateUrl: 'views/login.html'
        })
        .when(PATHS.LOGOUT, {
          controller: 'LogoutController',
          templateUrl: 'views/logout.html'
        })
        .when(PATHS.HOME, {
          controller: 'MainController',
          templateUrl: 'views/home.html'
        })

        .otherwise({redirectTo: PATHS.HOME});
    }])

  .run(['$rootScope', '$location', 'AuthenticationService', 'PATHS',
    function ($rootScope, $location, AuthenticationService, PATHS) {
      AuthenticationService.loginFromCookie();

      $rootScope.$on('$locationChangeStart', function () {
        // redirect to login page if not logged in
        var currentPath = $location.path();
        var currentUser = AuthenticationService.getUsername();

        if (currentPath !== PATHS.LOGIN && currentUser === null) {
          $location.path(PATHS.LOGIN);
        } else if (currentPath === PATHS.LOGIN && currentUser !== null) {
          $location.path(PATHS.HOME);
        }
      });
    }]);
