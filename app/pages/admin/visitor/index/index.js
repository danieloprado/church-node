(function(angular) {
  'use strict';

  angular.module('appVisitor').controller('appVisitor.indexCtrl', [
    '$scope',
    'UI',
    'query',
    IndexCtrl
  ]);

  function IndexCtrl($scope, UI, query) {
    console.log(query);
  }

})(angular);