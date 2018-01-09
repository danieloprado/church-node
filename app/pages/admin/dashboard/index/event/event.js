(angular => {
  'use strict';

  angular.module('app').component('appDashboardEventComponent', {
    templateUrl: '/views/pages/admin/dashboard/index/event/event.html',
    controller: [
      '$filter',
      'UI',
      'eventService',
      'eventListFactory',
      Controller
    ]
  });

  function Controller($filter, UI, eventService, eventListFactory) {
    this.dateGroups = [];
    this.loading = true;

    this.$onInit = () => {
      eventService.dashboard().then(events => {
        this.loading = false;
        this.dateGroups = eventListFactory(events, true);
      }).catch(UI.Toast.httpHandler);
    };

    this.details = (event, $event) => {
      eventService.details(event, $event);
    };
  }


})(angular);