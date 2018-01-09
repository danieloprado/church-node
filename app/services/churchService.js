((angular) => {
  'use strict';

  angular.module('app').factory('churchService', [
    'API',
    '$q',
    '$http',
    ChurchService
  ]);

  function ChurchService(API, $q, $http) {

    const list = () => {
      return $http.get(`${API}/church`).then(response => response.data);
    };

    const current = () => {
      return $http.get(`${API}/church/current`).then(response => response.data);
    };

    const save = (model) => {
      return $http.post(`${API}/church/current`, model).then(response => response.data);
    };

    const socialList = () => $q.resolve([
      { display: 'Facebook', name: 'facebook', icon: 'facebook-box' },
      { display: 'Youtube', name: 'youtube', icon: 'youtube-play' },
      { display: 'Website', name: 'website', icon: 'web' },
    ]);

    return {
      list,
      current,
      save,
      socialList
    };
  }

})(angular);