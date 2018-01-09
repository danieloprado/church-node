(function(angular) {
  'use strict';

  angular.module('appUser').config(Routes);

  function Routes($routeProvider) {
    const queryState = {};

    $routeProvider
      .when('/pessoas', {
        templateUrl: '/views/pages/admin/user/index/index.html',
        controller: 'appUser.listCtrl',
        controllerAs: '$ctrl',
        resolve: { query: () => queryState },
        roles: []
      });
  }
  Routes.$inject = ['$routeProvider'];

})(angular);