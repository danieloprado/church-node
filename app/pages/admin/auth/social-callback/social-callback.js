(function(angular) {
  'use strict';

  angular.module('appAuth').controller('appAuth.socialCallbackCtrl', [
    '$location',
    'authService',
    SocialCallbackCtrl
  ]);

  function SocialCallbackCtrl($location, authService) {
    const token = $location.search().t;

    if (token) {
      authService.setToken(token);
    }

    $location.path('/');
    $location.search('t', null);
  }

})(angular);