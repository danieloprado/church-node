(function(angular) {
  'use strict';

  angular.module('app').factory('dateHelper', [
    'moment',
    DateHelper
  ]);

  function DateHelper(moment) {

    function merge(date, hour) {
      date = angular.copy(date);

      if (hour) {
        const parts = hour.split(':');

        date.setHours(parts[0]);
        date.setMinutes(parts[1]);
        date.setSeconds(parts[2] || 0);
      }

      return date;
    }

    function parseObj(obj, fields) {
      if (!fields) {
        fields = Object.keys(obj).filter(x => x.toLowerCase().indexOf('date') > -1 || x.toLowerCase() === 'birthday');
      }

      fields.forEach(key => {
        if (!obj[key]) return;
        obj[key] = parse(obj[key]);
      });

      return obj;
    }

    function getTime(date) {
      if (!date) return;
      return moment(date).format('HH:mm');
    }

    function parse(value) {
      if (!value) return value;
      if (!isISODate(value)) return value;
      if (value instanceof Date) return value;

      return new Date(value);
    }

    function isISODate(value) {
      return /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d+)Z/.test(value);
    }

    return { merge, parseObj, getTime };

  }

})(angular);