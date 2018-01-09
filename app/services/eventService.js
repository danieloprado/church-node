((angular) => {
  'use strict';

  angular.module('app').factory('eventService', [
    'API',
    '$http',
    '$mdDialog',
    'dateHelper',
    EventService
  ]);

  function EventService(API, $http, $mdDialog, dateHelper) {
    const dashboard = () => {
      return $http.get(`${API}/dashboard/event`).then(response => {
        return response.data.map(item => {
          item.dates.forEach(d => dateHelper.parseObj(d));
          return item;
        });
      });
    };

    const list = query => {
      return $http({ method: 'GET', url: `${API}/event`, params: query }).then(response => {
        return response.data.map(item => {
          item.dates.forEach(d => dateHelper.parseObj(d));
          return item;
        });
      });
    };

    const details = (event, $event) => {
      return $mdDialog.show({
        controller: 'appEvent.detailsCtrl',
        controllerAs: '$ctrl',
        templateUrl: '/views/pages/admin/event/details/details.html',
        targetEvent: $event,
        fullscreen: true,
        resolve: {
          event: () => angular.copy(event)
        }
      });
    };

    const find = (id) => {
      return $http.get(`${API}/event/${id}`).then(response => {
        response.data.dates.forEach(d => dateHelper.parseObj(d));
        return response.data;
      });
    };

    const save = (model) => {
      return $http.post(`${API}/event`, model).then(response => {
        response.data.dates.forEach(d => dateHelper.parseObj(d));
        return response.data;
      });
    };

    const remove = (id) => {
      return $http.delete(`${API}/event/${id}`);
    };

    return { dashboard, list, details, find, save, remove };
  }

})(angular);