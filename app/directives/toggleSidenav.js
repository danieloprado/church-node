((angular) => {
  'use strict';

  angular.module('app')
    .directive('toggleSidenav', ['$mdSidenav', Directive]);

  function Directive($mdSidenav) {

    return {
      restrict: 'A',
      scope: false,
      link: ($scope, elem) => {
        elem.click(() => $mdSidenav('left').toggle());
      }
    };

  }

})(angular);