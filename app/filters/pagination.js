(function(angular) {
  'use strict';

  angular.module('app').filter('pagination', [
    '$filter',
    Pagination
  ]);

  function Pagination($filter) {
    const limitTo = $filter('limitTo');

    return function(array, pagination) {
      if (!array) return [];
      if (!pagination) return array;
      return limitTo(array, pagination.limit, (pagination.page - 1) * pagination.limit);
    };
  }

})(angular);