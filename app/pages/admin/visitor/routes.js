(function(angular) {
  'use strict';

  angular.module('appVisitor').config(Routes);

  function Routes($routeProvider) {
    const queryState = {};

    $routeProvider
      .when('/visitantes', {
        templateUrl: '/views/pages/admin/visitor/index/index.html',
        controller: 'appVisitor.indexCtrl',
        controllerAs: '$ctrl',
        resolve: { query: () => queryState },
        roles: []
      });
  }
  Routes.$inject = ['$routeProvider'];

})(angular);