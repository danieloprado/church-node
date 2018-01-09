((angular) => {
  'use strict';

  angular.module('app').directive('testError', [
    Directive
  ]);

  function Directive() {

    return {
      restrict: 'A',
      scope: false,
      link: ($scope, elem) => {
        let counter = 0,
          timeout;

        elem.click(() => {
          counter++;

          if (counter === 3) {
            counter = 0;
            alert('Error will sent');
            throw new Error('test-error');
          }

          clearTimeout(timeout);
          timeout = setTimeout(() => counter = 0, 1000);
        });
      }
    };

  }

})(angular);