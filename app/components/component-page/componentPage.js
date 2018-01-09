(angular => {
  'use strict';

  angular.module('app').component('appComponentPage', {
    template: '<div class="content-page-component animated fadeInUp" ng-show="!$ctrl.hide" id="app-component-page"/>',
    controller: Controller
  });

  function Controller($scope, $compile) {
    this.hide = true;
    const elem = angular.element('#app-component-page');

    $scope.$on('show-component-page', (info, data) => {
      elem.addClass('fadeInUp');
      elem.removeClass('fadeOutDown');

      this.hide = false;
      elem.html($compile(data.template)(data.$scope));
    });

    $scope.$on('hide-component-page', () => {
      elem.addClass('fadeOutDown');
      elem.removeClass('fadeInUp');

      this.hide = true;
    });
  }
  Controller.$inject = ['$scope', '$compile'];


})(angular);