(function(angular) {
  'use strict';

  angular.module('appChurch')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/igreja', {
        templateUrl: '/views/pages/admin/church/edit/edit.html',
        controller: 'appChurch.editCtrl',
        controllerAs: '$ctrl',
        roles: ['admin']
      });
  }

})(angular);