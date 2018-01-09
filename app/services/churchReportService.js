((angular) => {
  'use strict';

  angular.module('app').factory('churchReportService', [
    'API',
    'API_PUBLIC',
    '$http',
    '$mdDialog',
    'dateHelper',
    ChurchReportService
  ]);

  function ChurchReportService(API, API_PUBLIC, $http, $mdDialog, dateHelper) {
    let typesPromise;

    const list = (query) => {
      return $http.get(`${API}/church-report`, { params: query }).then((response) => {
        return response.data.map((item) => {
          return dateHelper.parseObj(item);
        });
      });
    };

    const types = () => {
      if (!typesPromise) {
        typesPromise = $http.get(`${API}/church-report/types`).then((response) => {
          return response.data;
        });
      }

      return typesPromise;
    };

    const form = (report, $event) => {
      return $mdDialog.show({
        controller: 'appChurchReport.formCtrl',
        controllerAs: '$ctrl',
        templateUrl: '/views/pages/admin/church-report/form/form.html',
        targetEvent: $event,
        fullscreen: true,
        resolve: {
          report: () => angular.copy(report)
        }
      });
    };

    const save = model => {
      return $http.post(`${API}/church-report`, model).then((response) => response.data);
    };

    const remove = (id) => {
      return $http.delete(`${API}/church-report/${id}`);
    };

    return {
      list,
      types,
      form,
      save,
      remove
    };
  }

})(angular);