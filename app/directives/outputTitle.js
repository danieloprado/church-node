((angular) => {
  'use strict';

  angular.module('app').directive('appOutputTitle', [Directive]);

  function Directive() {

    return {
      scope: false,
      link: ($scope, elem) => {
        $scope.$on('change-page-title', (info, data) => elem.html(data));
      }
    };

  }

})(angular);