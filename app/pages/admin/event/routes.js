(function(angular) {
  'use strict';

  angular.module('appEvent').config([
    '$routeProvider',
    Routes
  ]);

  function Routes($routeProvider) {
    const queryState = {};

    $routeProvider
      .when('/agenda', {
        templateUrl: '/views/pages/admin/event/list/list.html',
        controller: 'appEvent.listCtrl',
        controllerAs: '$ctrl',
        resolve: { query: () => queryState }
      }).when('/agenda/criar', {
        templateUrl: '/views/pages/admin/event/form/form.html',
        controller: 'appEvent.formCtrl',
        controllerAs: '$ctrl'
      }).when('/agenda/:id/editar', {
        templateUrl: '/views/pages/admin/event/form/form.html',
        controller: 'appEvent.formCtrl',
        controllerAs: '$ctrl'
      });
  }

})(angular);