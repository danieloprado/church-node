(function(angular) {
  'use strict';

  angular.module('appChurchReport').config(Routes);

  function Routes($routeProvider) {
    const queryState = {};

    $routeProvider
      .when('/relatorios-culto', {
        templateUrl: '/views/pages/admin/church-report/index/index.html',
        controller: 'appChurchReport.indexCtrl',
        controllerAs: '$ctrl',
        resolve: { query: () => queryState }
      });
  }
  Routes.$inject = ['$routeProvider'];

})(angular);