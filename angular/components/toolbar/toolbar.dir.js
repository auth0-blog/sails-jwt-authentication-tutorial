(function() {
  
  'use strict';
  
  angular
    .module('authApp')
    .directive('toolbar', toolbar);
    
  function toolbar() {
    return {
      templateUrl: 'components/toolbar/toolbar.tpl.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    }
  }
    
  function toolbarController(auth, store, $location) {
    var vm = this;
    vm.login = login;
    vm.logout = logout;
    vm.auth = auth;
    
    function login() {
      // The auth service has a signin method that
      // makes use of Auth0Lock. If authentication
      // is successful, the user's profile and token
      // are saved in local storage with the store service
      auth.signin({}, function(profile, token) {
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/home');
      }, function(error) {
        console.log(error);
      })
    }
    
    function logout() {
      // The signout method on the auth service
      // sets isAuthenticated to false but we
      // also need to remove the profile and
      // token from local storage
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/home');
    }
  }
  
})();