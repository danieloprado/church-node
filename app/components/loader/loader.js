((angular) => {
  'use strict';

  angular.module('app').component('appLoaderComponent', {
    template: `
      <div ng-if="!$ctrl.hide">
        <md-progress-circular
              class="md-accent"
              md-diameter="60"
              md-mode="indeterminate" />
        </md-progress-circular>
      </div>`,
    controller: Loader
  });

  function Loader($scope) {
    this.hide = true;

    $scope.$on('loading-started', () => this.hide = false);
    $scope.$on('loading-finished', () => this.hide = true);
  }
  Loader.$inject = ['$scope'];

})(angular);