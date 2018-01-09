(function(angular) {
  'use strict';

  angular.module('app').factory('loginService', [
    'API',
    '$http',
    '$q',
    '$route',
    '$mdDialog',
    'componentPage',
    'authService',
    LoginService
  ]);

  function LoginService(API, $http, $q, $route, $mdDialog, componentPage, Auth) {
    let loginPromise = null;

    const openLogin = function() {
      if (!loginPromise) {
        loginPromise = componentPage('appLoginComponent');
        loginPromise.finally(() => loginPromise = null);
      }

      return loginPromise;
    };

    const login = (credentials) => {
      return $http.post(`${API}/auth/login`, credentials);
    };

    const urlLoginSocial = (provider) => {
      switch (provider) {
        case 'facebook':
          return `${API}/auth/facebook`;
        case 'google':
          return `${API}/auth/google`;
        default:
          return '/';
      }
    };

    const changeChurch = (churchId) => {
      return $http.post(`${API}/auth/change-church`, { churchId });
    };

    const sendReset = (email) => {
      return $http.post(`${API}/auth/send-reset`, { email });
    };

    const resetPassword = (token, password) => {
      return $http.post(`${API}/auth/reset-password`, { token, password });
    };

    const openChangePassword = ($event) => {
      return $mdDialog.show({
        templateUrl: '/views/pages/admin/auth/change-password/changePassword.html',
        controller: 'appAuth.changePasswordCtrl',
        controllerAs: '$ctrl',
        fullscreen: true,
        targetEvent: $event
      });
    };

    const changePassword = (model) => {
      return $http.post(`${API}/auth/change-password`, model);
    };

    const logout = () => {
      Auth.removeToken();
      $route.reload();
      return $q.resolve();
    };

    return {
      openLogin,
      login,
      changeChurch,
      urlLoginSocial,
      sendReset,
      resetPassword,
      openChangePassword,
      changePassword,
      logout
    };
  }

})(angular);