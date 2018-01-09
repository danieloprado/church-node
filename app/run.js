(function(angular) {
  'use strict';

  angular.module('app')
    .run(['$rootScope', 'authService', userInfo])
    .run(['$rootScope', '$location', 'authService', 'loginService', RunLoginCheck])
    .run(['$mdDialog', fixMdPickers]);

  function userInfo($rootScope, authService) {
    authService.onUserChange(user => {
      $rootScope.user = user || {};
    });
  }

  function RunLoginCheck($rootScope, $location, authService, loginService) {
    $rootScope.$on('$routeChangeStart', ($event, next) => {
      if (next.$$route && next.$$route.roles && !authService.canAccess(next.$$route.roles)) {
        $event.preventDefault();
        $location.path('/');
        return false;
      }

      if (!next.$$route || next.$$route.allowAnonymous || authService.hasToken()) {
        return true;
      }

      next.$$route.resolve = next.$$route.resolve || {};
      next.$$route.resolve.login = () => loginService.openLogin();
    });

    $rootScope.$on('$routeChangeSuccess', ($event, current) => {
      if (current.$$route && current.$$route.resolve && current.$$route.resolve.login) {
        delete current.$$route.resolve.login;
      }
    });

    $rootScope.$on('$routeChangeError', loginService.logout);
  }

  function fixMdPickers($mdDialog) {
    const oldShow = $mdDialog.show;

    $mdDialog.show = function(options) {
      if (options.hasOwnProperty('skipHide')) {
        options.multiple = options.skipHide;
      }

      return oldShow(options);
    };
  }

})(angular);