(function() {

  'use strict';

  angular.module('authApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
    .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {

      authProvider.init({
        domain: 'unicodeveloper.auth0.com',
        clientID: 'mOh81XhUQvqeQ1uVY2yvgERpKKQjSKQr'
      });



      $urlRouterProvider.otherwise("/home");

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'components/home/home.tpl.html'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'components/profile/profile.tpl.html',
          controller: 'profileController as user'
        });

      jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
      }

      function redirect($q, $injector, $timeout, store, $location) {

        var auth;
        $timeout(function() {
          auth = $injector.get('auth');
        });

        return {
          responseError: function(rejection) {

            if (rejection.status === 401) {
              auth.signout();
              store.remove('profile');
              store.remove('token');
              $location.path('/home')
            }
            return $q.reject(rejection);
          }
        }
      }
      $provide.factory('redirect', redirect);
      $httpProvider.interceptors.push('jwtInterceptor');
      $httpProvider.interceptors.push('redirect');
    })
    .run(function($rootScope, $state, auth, store, jwtHelper, $location) {

      $rootScope.$on('$locationChangeStart', function() {
        // Get the JWT that is saved in local storage
        // and if it is there, check whether it is expired.
        // If it isn't, set the user's auth state
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          }
        }
        else {
          // Otherwise, redirect to the home route
          $location.path('/home');
        }
      });

    });

})();