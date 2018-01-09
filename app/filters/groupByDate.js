(function(angular) {
  'use strict';

  angular.module('app').filter('groupByDate', [
    '$filter',
    GrouByDate
  ]);

  function GrouByDate($filter) {
    const dateFilter = $filter('date');
    const isSameDay = (date1, date2) => {
      const date1Formatted = dateFilter(date1, 'yyyy-MM-dd');
      const date2Formatted = dateFilter(date2, 'yyyy-MM-dd');
      return date1Formatted === date2Formatted;
    };

    return function(data, prop) {
      if (!data) return;
      if (!data.length) return [];

      return data.reduce((acc, a) => {
        let group = acc[acc.length - 1];

        if (group.length === 0) {
          group.push(a);
          return acc;
        }

        const last = group[group.length - 1];
        if (isSameDay(a[prop], last[prop])) {
          group.push(a);
          return acc;
        }

        group = [a];
        acc.push(group);
        return acc;
      }, [
        []
      ]);
    };
  }

})(angular);