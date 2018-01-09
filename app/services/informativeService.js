((angular) => {
  'use strict';

  angular.module('app')
    .factory('informativeService', [
      'API',
      'API_PUBLIC',
      '$http',
      '$q',
      '$mdDialog',
      'dateHelper',
      'authService',
      InformativeService
    ]);

  function InformativeService(API, API_PUBLIC, $http, $q, $mdDialog, dateHelper, authService) {

    const list = () => {
      return $http.get(`${API}/informative`).then((response) => {
        const user = authService.getUser();

        return response.data.map((item) => {
          item.shareUrl = `/${user.church.slug}/informativo/${item.id}`;
          return dateHelper.parseObj(item);
        });
      });
    };

    const get = (id) => {
      return $http.get(`${API}/informative/${id}`).then(res => dateHelper.parseObj(res.data));
    };

    const getPublic = (churchSlug, id) => {
      return $http.get(`${API_PUBLIC}/${churchSlug}/informatives/${id}`).then(res => dateHelper.parseObj(res.data));
    };

    const save = (model) => {
      return $http.post(`${API}/informative`, model).then((response) => dateHelper.parseObj(response.data));
    };

    const remove = (id) => {
      return $http.delete(`${API}/informative/${id}`);
    };

    const types = () => {
      return $q.resolve([
        { id: 1, name: 'Igreja', icon: 'newspaper' },
        { id: 2, name: 'Célula', icon: 'home' }
      ]);
    };

    return {
      list,
      get,
      getPublic,
      save,
      remove,
      types
    };
  }

})(angular);