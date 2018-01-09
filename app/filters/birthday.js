(function(angular) {
  'use strict';

  angular.module('app').filter('birthday', [
    '$filter',
    Birthday
  ]);

  function Birthday($filter) {
    const dateFilter = $filter('date');

    return function(value) {
      if (!value || !(value instanceof Date) || isNaN(value.getTime())) return;

      let format = value.getFullYear() === 1900 ? 'd \'de\' MMMM' : 'longDate';
      return dateFilter(value, format);
    };
  }

})(angular);