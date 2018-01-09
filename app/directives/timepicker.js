(function(angular) {
  'use strict';

  angular.module('app').directive('timepicker', [
    '$compile',
    '$mdpTimePicker',
    'moment',
    Timepicker
  ]);

  function Timepicker($compile, $mdpTimePicker, moment) {

    return {
      restric: 'A',
      scope: {
        ngModel: '='
      },
      priority: 1,
      replace: false,
      terminal: true,
      compile: (tElement, tAttrs) => {
        tElement.removeAttr('timepicker');
        tElement.before('<md-icon md-svg-icon="clock" ng-click="showPicker($event)"></md-icon>');
        tElement.parent('md-input-container').addClass('md-icon-float md-icon-left');
        tAttrs.$set('ui-time-mask', 'short');

        return {
          pre: ($scope, iElement) => {
            $scope.showPicker = (targetEvent) => {
              if (iElement.attr('disabled')) return;
              let modelValue = null;

              if ($scope.ngModel) {
                modelValue = moment($scope.ngModel, 'HH:mm').toDate();
              }

              $mdpTimePicker(modelValue, {
                targetEvent,
                ampm: false,
                confirmText: 'OK',
                cancelText: 'Cancelar'
              }).then(selectedDate => $scope.ngModel = moment(selectedDate).format('HH:mm'));
            };

            $compile(iElement)($scope);
          }
        };
      }
    };

  }


})(angular);