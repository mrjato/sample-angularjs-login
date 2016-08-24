# Sample AngularJS Authentication
This project is a sample of how to use HTTP Basic authentication in AngularJS. In addition, this example is designed to be used in a front-end application that uses a RESTful back-end with HTTP Basic as the authentication method.

## Configuration
In order to use this example, the following constants should be configured in the `app.js` script:
* `BACKEND.PATH`: this constant should contain the base URL of the RESTful services (optional, only informative in the example).
* `BACKEND.API`: this constant should contain the URL of the RESTful API (optional, only informative in the example).
* `BACKEND.LOGIN`: this constant should contain an URL to retrieve the user data. In order to check the user's credentials, a request with the Authentication header will be sent to this URL with the user's login concatenated. Only the HTTP code of the response will be used, meaning that the content of a 200 OK response isn't really used. However, it's recommended to response with some information about the user.
* `BACKEND.OPTIONS`: this constant should contain an URL to get the HTTP OPTIONS allowed. This URL is used when an error happens in an authentication request, in order to check if the back-end is down or not.

In addition, the following constants can be configured too:
* `PATHS.LOGIN`: Local login path.
* `PATHS.LOGOUT`: Local logout path.
* `PATHS.HOME`: Local home path.

