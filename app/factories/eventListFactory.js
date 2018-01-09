(function(angular) {
  'use strict';

  angular.module('app').factory('eventListFactory', [
    '$filter',
    EventListFactory
  ]);

  function EventListFactory($filter) {
    const dateFilter = $filter('date');

    function transform(events, skipMonth) {
      if (!events.length) return [];
      const result = grouByDate(sortByDate(reduceByDate(events)));

      if (skipMonth) return result;
      return groupByMonth(result);
    }

    function reduceByDate(events) {
      return events.reduce((acc, event) => {
        Array.prototype.push.apply(acc, event.dates.map(d => {
          d.event = event;
          return d;
        }));
        return acc;
      }, []);
    }

    function sortByDate(eventDates) {
      return eventDates.sort((a, b) => {
        if (a.beginDate === b.beginDate) return 0;
        if (a.beginDate < b.beginDate) return -1;
        return 1;
      });
    }

    function grouByDate(eventDates) {
      const isSameDay = (date1, date2) => {
        const date1Formatted = dateFilter(date1, 'yyyy-MM-dd');
        const date2Formatted = dateFilter(date2, 'yyyy-MM-dd');

        return date1Formatted === date2Formatted;
      };

      return eventDates.reduce((acc, eventDate) => {
        let group = acc[acc.length - 1];

        if (group.length === 0) {
          group.push(eventDate);
          return acc;
        }

        const last = group[group.length - 1];
        if (isSameDay(eventDate.beginDate, last.beginDate)) {
          group.push(eventDate);
          return acc;
        }

        group = [eventDate];
        acc.push(group);
        return acc;
      }, [
        []
      ]);
    }

    function groupByMonth(eventGroupDates) {
      const isSameMonth = (date1, date2) => {
        const date1Formatted = dateFilter(date1, 'yyyy-MM');
        const date2Formatted = dateFilter(date2, 'yyyy-MM');

        return date1Formatted === date2Formatted;
      };

      return eventGroupDates.reduce((acc, eventGroupDate) => {
        let group = acc[acc.length - 1];

        if (group.length === 0) {
          group.push(eventGroupDate);
          return acc;
        }

        const last = group[group.length - 1];
        if (isSameMonth(eventGroupDate[0].beginDate, last[0].beginDate)) {
          group.push(eventGroupDate);
          return acc;
        }

        group = [eventGroupDate];
        acc.push(group);
        return acc;
      }, [
        []
      ]);
    }

    return transform;

  }

})(angular);