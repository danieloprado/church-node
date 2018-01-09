(function(angular) {
  'use strict';

  angular.module('appDashboard')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/views/pages/admin/dashboard/index/index.html',
      controller: 'appDashboard.indexCtrl',
      controllerAs: '$ctrl'
    });
  }

})(angular);