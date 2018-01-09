(function(angular) {
  'use strict';

  angular.module('app').directive('appScrollTop', [
    '$rootScope',
    directive
  ]);

  function directive($rootScope) {

    return {
      restrict: 'A',
      scope: false,
      link: (scope, element) => {
        $rootScope.$on('scroll-top', () => {
          angular.element(element).animate({ scrollTop: 0 }, 300);
        });
      }
    };

  }

})(window.angular);