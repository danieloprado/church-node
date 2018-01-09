(function(angular) {
  'use strict';

  angular.module('appPublicInformative').controller('appPublicInformative.detailsCtrl', [
    '$routeParams',
    'UI',
    'informativeService',
    DetailsCtrl
  ]);

  function DetailsCtrl($routeParams, UI, informativeService) {
    this.loading = true;
    this.informative = null;

    UI.Loader(informativeService.getPublic($routeParams.church, $routeParams.id))
      .then(informative => this.informative = informative)
      .finally(() => this.loading = false);
  }

})(angular);