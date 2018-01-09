(function(angular) {
  'use strict';

  angular.module('app').factory('lodash', ['$window', ($window) => $window._]);
  angular.module('app').factory('moment', ['$window', ($window) => $window.moment]);
  angular.module('app').factory('marked', ['$window', ($window) => $window.marked]);
  angular.module('app').factory('c3', ['$window', ($window) => $window.c3]);
  angular.module('app').factory('uuid', ['$window', ($window) => () => $window.UUIDjs.create().hex]);

})(angular);