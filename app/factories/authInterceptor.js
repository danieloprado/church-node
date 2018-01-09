(function(angular) {
  'use strict';

  angular.module('app').factory('authInterceptor', [
    '$q',
    '$injector',
    '$rootScope',
    'authService',
    AuthInterceptor
  ]);

  function AuthInterceptor($q, $injector, $rootScope, authService) {

    const resolveLogin = (response) => {
      const loginService = $injector.get('loginService');
      const Loader = $injector.get('Loader');

      Loader.disable();
      return loginService.openLogin().then(() => {
        Loader.enable();
        return $injector.get('$http')(response.config);
      }).catch(err => {
        throw err || { status: 401 };
      });
    };

    return {
      request: function(config) {
        if (authService.hasToken()) {
          config.headers.Authorization = 'Bearer ' + authService.getToken();
        }

        return config;
      },

      response: function(response) {
        const token = response.headers('X-Token');
        if (token && token !== authService.getToken()) {
          authService.setToken(token);
        }

        return response;
      },

      responseError: function(response) {
        if (response.status === 401) {
          return resolveLogin(response);
        }

        return $q.reject(response);
      }

    };
  }
})(angular);