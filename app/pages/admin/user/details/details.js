((angular) => {
  'use strict';

  angular.module('appUser').controller('appUser.detailsCtrl', [
    '$mdDialog',
    'user',
    DetailsCtrl
  ]);

  function DetailsCtrl($mdDialog, user) {
    this.model = user || {};

    this.close = () => {
      $mdDialog.hide();
    };

  }

})(angular);