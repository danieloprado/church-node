(function(angular) {
  'use strict';

  angular.module('app').filter('datePeriod', [
    '$filter',
    DatePeriod
  ]);

  function DatePeriod($filter) {
    const dateFilter = $filter('date');
    const format = (date, fullDate = true) => {
      const fmt = fullDate ? 'EEEE, dd \'de\' MMMM, y \'às\' HH:mm' : 'HH:mm';
      return dateFilter(date, fmt);
    };

    return function(beginDate, endDate) {
      if (!endDate) {
        return format(beginDate);
      }

      if (beginDate.getDate() === endDate.getDate()) {
        return `${format(beginDate)} até ${format(endDate, false)}`;
      }

      return `${format(beginDate)}<br>${format(endDate)}`;
    };
  }

})(angular);