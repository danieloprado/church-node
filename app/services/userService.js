((angular) => {
  'use strict';

  angular.module('app')
    .factory('userService', [
      'API',
      '$http',
      '$q',
      '$mdDialog',
      'dateHelper',
      'userRolesFactory',
      UserService
    ]);

  function UserService(API, $http, $q, $mdDialog, dateHelper, userRolesFactory) {
    let rolesPromise;

    const list = () => {
      return $http.get(`${API}/user`).then((response) => {
        return response.data.map(u => dateHelper.parseObj(u));
      });
    };

    const roles = () => {
      if (!rolesPromise) {
        rolesPromise = $http.get(`${API}/user/roles`).then(response => {
          return userRolesFactory(response.data);
        });
      }

      return rolesPromise;
    };

    const byEmail = email => {
      return $http.get(`${API}/user/by-email/${encodeURIComponent(email)}`).then((response) => {
        return response.data;
      });
    };

    const save = model => {
      return $http.post(`${API}/user`, model).then((response) => response.data);
    };

    const remove = userId => {
      return $http.delete(`${API}/user/${userId}`).then((response) => response.data);
    };

    const count = () => {
      return $http.get(`${API}/user/count`).then(res => res.data);
    };

    const becomeMember = userId => {
      return $http.post(`${API}/user/become-member`, { userId }).then((response) => response.data);
    };

    const form = (user, $event) => {
      return $mdDialog.show({
        controller: 'appUser.formCtrl',
        controllerAs: '$ctrl',
        templateUrl: '/views/pages/admin/user/form/form.html',
        targetEvent: $event,
        fullscreen: true,
        resolve: {
          user: () => angular.copy(user)
        }
      });
    };

    const details = (user, $event) => {
      return $mdDialog.show({
        controller: 'appUser.detailsCtrl',
        controllerAs: '$ctrl',
        templateUrl: '/views/pages/admin/user/details/details.html',
        targetEvent: $event,
        fullscreen: true,
        resolve: {
          user: () => angular.copy(user)
        }
      });
    };

    return {
      list,
      roles,
      byEmail,
      save,
      remove,
      count,
      becomeMember,
      form,
      details
    };
  }

})(angular);