((angular) => {
  'use strict';

  angular.module('app').directive('appShowRoles', [
    'authService',
    Directive
  ]);

  function Directive(authService) {

    return {
      restrict: 'A',
      scope: false,
      link: ($scope, elem, attrs) => {
        const roles = attrs.appShowRoles.split(',');

        authService.onUserChange(user => {
          if (!user || !authService.canAccess(roles)) return elem.hide();
          elem.show();
        });
      }
    };

  }

})(angular);