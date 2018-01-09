(function(angular) {
  'use strict';

  angular.module('appInformative').config(Routes);

  function Routes($routeProvider) {
    const queryState = {};

    $routeProvider
      .when('/informativos', {
        templateUrl: '/views/pages/admin/informative/list/list.html',
        controller: 'appInformative.listCtrl',
        controllerAs: '$ctrl',
        resolve: { query: () => queryState }
      })
      .when('/informativos/novo', {
        templateUrl: '/views/pages/admin/informative/form/form.html',
        controller: 'appInformative.formCtrl',
        controllerAs: '$ctrl'
      })
      .when('/informativos/:id/editar', {
        templateUrl: '/views/pages/admin/informative/form/form.html',
        controller: 'appInformative.formCtrl',
        controllerAs: '$ctrl'
      });
  }
  Routes.$inject = ['$routeProvider'];

})(angular);