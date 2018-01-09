(function(angular) {
  'use strict';

  angular.module('appPublicStatic').config([
    '$routeProvider',
    Routes
  ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/politica-de-privacidade', {
        templateUrl: '/views/pages/public/static/privacy.html',
        allowAnonymous: true
      });
  }

})(angular);