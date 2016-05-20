'use strict';

angular.module('Home')
  .service('AuthenticationService',
    ['$http', '$cookies', 'Base64', 'BACKEND',
      function ($http, $cookies, Base64, BACKEND) {
        var addHttpHeader = function(authdata) {
          $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
        };

        var addHttpHeaderCredentials = function(username, password) {
          addHttpHeader(Base64.encode(username + ':' + password));
        };

        var removeHttpHeader = function() {
          $http.defaults.headers.common.Authorization = 'Basic ';
        };

        var storeCredentials = function(credentials) {
          $cookies.putObject('authentication-credentials', credentials);
        };

        var removeCredentials = function() {
          $cookies.remove('authentication-credentials');
        };

        var retrieveCredentials = function() {
          var credentials = $cookies.getObject('authentication-credentials');

          return credentials === undefined ? null : credentials;
        };

        this.loginFromCookie = function () {
          var credentials = retrieveCredentials();

          if (credentials !== null) {
            addHttpHeader(this.getAuthData());

            return true;
          } else {
            return false;
          }
        };

        this.login = function (username, password, callback) {
          addHttpHeaderCredentials(username, password);

          $http.get(BACKEND.LOGIN + username)
            .then(
              callback,
              function errorCallback(response) {
                removeHttpHeader();

                if (response.status === -1) {
                  $http({
                    method: 'OPTIONS',
                    url: BACKEND.OPTIONS
                  }).then(
                    function(optionsResponse) {
                      if (optionsResponse.status === 200) {
                        response.status = 401;
                      }

                      callback(response);
                    },
                    callback
                  );
                } else {
                  callback(response);
                }
              }
            );
        };

        this.setCredentials = function (username, password) {
          var credentials = {
            username: username,
            authdata: Base64.encode(username + ':' + password)
          };

          addHttpHeader(credentials.authdata);
          storeCredentials(credentials);
        };

        this.clearCredentials = function () {
          removeCredentials();
          removeHttpHeader();
        };

        this.getUsername = function () {
          var credentials = retrieveCredentials();

          return credentials === null ? null : credentials.username;
        };

        this.getAuthData = function () {
          var credentials = retrieveCredentials();

          return credentials === null ? null : credentials.authdata;
        };
      }]);
