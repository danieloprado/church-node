((angular) => {
  'use strict';

  angular.module('appEvent').controller('appEvent.detailsCtrl', [
    '$mdDialog',
    'event',
    DetailsCtrl
  ]);

  function DetailsCtrl($mdDialog, event) {
    this.model = event || {};

    this.close = () => {
      $mdDialog.hide();
    };

  }

})(angular);