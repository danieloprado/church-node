(function(angular) {
  'use strict';

  angular.module('appAuth').config([
    '$routeProvider',
    Routes
  ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/nova-senha', {
        templateUrl: '/views/pages/admin/auth/new-password/new-password.html',
        controller: 'appAuth.newPasswordCtrl',
        controllerAs: '$ctrl',
        allowAnonymous: true
      })
      .when('/social-callback', {
        template: '',
        controller: 'appAuth.socialCallbackCtrl',
        controllerAs: '$ctrl',
        allowAnonymous: true
      });
  }

})(angular);