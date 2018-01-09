(function(angular) {
  'use strict';

  angular.module('app').directive('datepicker', DatePicker);

  function DatePicker($compile, $mdpDatePicker) {

    return {
      restric: 'A',
      scope: {
        ngModel: '=',
        max: '@'
      },
      priority: 1,
      replace: false,
      terminal: true,
      compile: (tElement, tAttrs) => {
        tElement.removeAttr('datepicker');
        tElement.before('<md-icon md-svg-icon="calendar" ng-click="showPicker($event)"></md-icon>');
        tElement.parent('md-input-container').addClass('md-icon-float md-icon-left');
        tAttrs.$set('ui-date-mask', '');

        return {
          pre: ($scope, iElement) => {
            $scope.showPicker = (targetEvent) => {
              if (iElement.attr('disabled')) return;

              $mdpDatePicker($scope.ngModel, {
                targetEvent,
                maxDate: $scope.max === 'today' ? new Date() : null,
                confirmText: 'OK',
                cancelText: 'Cancelar'
              }).then(selectedDate => $scope.ngModel = selectedDate);

              setTimeout(() => {
                angular.element('.md-dialog-backdrop').first().css({ zIndex: 81 });
                angular.element('.md-dialog-container').last().css({ zIndex: 82 });
              });
            };

            $compile(iElement)($scope);
          }
        };
      }
    };

  }
  DatePicker.$inject = ['$compile', '$mdpDatePicker'];


})(angular);