(function(angular) {
  'use strict';

  angular.module('appPublicInformative').config([
    '$routeProvider',
    Routes
  ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/:church/informativo/:id', {
        templateUrl: '/views/pages/public/informative/details/details.html',
        controller: 'appPublicInformative.detailsCtrl',
        controllerAs: '$ctrl',
        allowAnonymous: true
      });
  }

})(angular);