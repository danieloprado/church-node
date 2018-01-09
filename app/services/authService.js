(function(angular) {
  'use strict';

  angular.module('app').service('authService', [
    '$window',
    'jwtHelper',
    'lodash',
    AuthService
  ]);

  function AuthService($window, jwtHelper, _) {
    const changeHandlers = [];
    const isValidToken = token => {
      // try {
      //   return token && !jwtHelper.isTokenExpired(token);
      // } catch (err) {
      //   return false;
      // }
      return !!token;
    };

    this.getToken = () => {
      return $window.localStorage.getItem('token');
    };

    this.setToken = (token) => {
      if (!isValidToken(token)) return false;
      $window.localStorage.setItem('token', token);
      changeHandlers.forEach(h => h(this.getUser()));
    };

    this.removeToken = () => {
      return $window.localStorage.removeItem('token');
    };

    this.hasToken = () => {
      return isValidToken($window.localStorage.getItem('token'));
    };

    this.getUser = () => {
      if (!this.hasToken()) return null;
      return jwtHelper.decodeToken(this.getToken());
    };

    this.onUserChange = handler => {
      changeHandlers.push(handler);
      handler(this.getUser());
    };

    this.canAccess = roles => {
      const user = this.getUser();
      if (!user) return false;
      if (!roles || roles.length === 0) return true;

      roles = _.flattenDeep([roles, ['sysAdmin', 'admin']]);
      return _.intersection(roles, user.roles).length > 0;
    };
  }

})(angular);