(function() {

  'use strict';

  angular
    .module('authApp')
    .controller('profileController', profileController);

  function profileController($http) {

    var vm = this;
    vm.getPublicQuote = getPublicQuote;
    vm.getSecretQuote = getSecretQuote;
    vm.message;

    vm.profile = JSON.parse(localStorage.getItem('profile'));

    // Makes a call to a public API route that
    // does not require authentication. We can
    // avoid sending the JWT as an Authorization
    // header with skipAuthorization: true
    function getPublicQuote() {
      $http.get('http://localhost:1337/api/random-quote', {
        skipAuthorization: true
      }).then(function(response) {
        vm.message = response.data.quote;
      });
    }

    // Makes a call to a private endpoint that does
    // require authentication. The JWT is automatically
    // sent with HTTP calls using jwtInterceptorProvider in app.js
    function getSecretQuote() {
      $http.get('http://localhost:1337/api/protected/random-quote').then(function(response) {
        vm.message = response.data.quote;
      });
    }

  }

})();