(function(angular) {
  'use strict';

  angular.module('appEvent').controller('appEvent.listCtrl', [
    '$scope',
    '$timeout',
    '$filter',
    'moment',
    'UI',
    'eventService',
    'eventListFactory',
    'query',
    ListCtrl
  ]);

  function ListCtrl($scope, $timeout, $filter, moment, UI, service, factory, query) {
    let queryTimeout = null;

    this.loading = true;
    this.monthGroups = [];
    this.events = [];

    this.query = query;
    this.query.beginDate = query.beginDate || moment().toDate();
    this.query.endDate = query.endDate || moment(this.query.beginDate).add(1, 'month').toDate();

    this.delete = ($event, event) => {
      UI.Confirm(`Deseja apagar o evento **${event.title}**? \nTambém irá apagar todos os dias cadastrados para esse evento`, $event).then(() => {
        return UI.Loader(service.remove(event.id));
      }).then(() => {
        this.events.splice(this.events.indexOf(event), 1);
        UI.Toast('Excluído com successo', 'success');
      }).catch(error => {
        if (error.isConfirm) return;

        this.events.push(event);
        UI.Toast('Não foi possível apagar o evento', 'error');
      });
    };

    this.details = (event, $event) => {
      service.details(event, $event);
    };

    $scope.$watch(() => this.query, () => {
      $timeout.cancel(queryTimeout);

      if (this.queryForm.$invalid) return;

      queryTimeout = $timeout(() => {
        this.loading = true;
        return service.list(this.query);
      }, 500).then(data => {
        this.events = data;
        this.loading = false;
      }).catch(UI.Toast.httpHandler);

    }, true);

    $scope.$watchCollection(() => this.events, () => {
      this.monthGroups = factory(this.events || []);
    });

  }

})(angular);