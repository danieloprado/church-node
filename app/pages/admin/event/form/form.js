((angular) => {
  'use strict';

  angular.module('appEvent').controller('appEvent.formCtrl', [
    '$location',
    '$routeParams',
    'UI',
    'dateHelper',
    'eventService',
    FormCtrl
  ]);

  function FormCtrl($location, $routeParams, UI, dateHelper, service) {
    const model = this.model = { dates: [{}], quiz: {} };
    this.editing = $routeParams.id;

    if ($routeParams.id) {
      UI.Loader(service.find($routeParams.id)).then(data => {
        angular.extend(model, data);
        model.quiz = model.quiz || {};

        model.dates.forEach(dateModel => {
          dateModel.beginTime = dateHelper.getTime(dateModel.beginDate);
          dateModel.endTime = dateHelper.getTime(dateModel.endDate);
        });
      });
    }

    this.submit = () => {
      const data = angular.copy(this.model);

      data.dates.forEach(dateModel => {
        dateModel.beginDate = dateHelper.merge(dateModel.beginDate, dateModel.beginTime);
        dateModel.endDate = dateModel.endTime ? dateHelper.merge(dateModel.beginDate, dateModel.endTime) : null;
      });

      if (!data.featured) {
        data.featuredText = null;
      }

      UI.Loader(service.save(data)).then(() => {
        UI.Toast('Salvo', 'success');
        $location.path('/agenda');
      }).catch(UI.Toast.httpHandler);
    };

    this.addDate = () => {
      this.model.dates.push({});
    };

    this.removeDate = ($index) => {
      this.model.dates.splice($index, 1);
    };

  }

})(angular);