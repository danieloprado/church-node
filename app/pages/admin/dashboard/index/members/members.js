(angular => {
  'use strict';

  angular.module('app').component('appDashboardMembersComponent', {
    templateUrl: '/views/pages/admin/dashboard/index/members/members.html',
    controller: [
      '$filter',
      'UI',
      'userService',
      Controller
    ]
  });

  function Controller($filter, UI, userService) {
    this.total = 0;
    this.loading = true;

    this.$onInit = () => {
      userService.count().then(total => {
        this.loading = false;
        this.total = total;
      }).catch(UI.Toast.httpHandler);
    };
  }


})(angular);