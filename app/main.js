(function(angular) {
  'use strict';

  angular.module('app', [
      'ngSanitize',
      'ngMaterial',
      'ngMessages',
      'ngAnimate',
      'ngRoute',
      'angular-jwt',
      'md.data.table',
      'mdFormValidator',
      'uiGmapgoogle-maps',
      'ui.utils.masks',
      'mdPickers',
      'validatorAsync',
      'validatorEquals',

      'appAdmin',
      'appPublic'
    ])
    .constant('API', '/api/web')
    .constant('API_PUBLIC', '/api/app')
    .constant('FACEBOOK_APP_ID', '1161262080594379')
    .constant('SENTRY_KEY', 'https://5cb5619f052244d0af30d3744cb0d98f@sentry.io/145486')
    .constant('ENV', '@ENV');


})(angular);