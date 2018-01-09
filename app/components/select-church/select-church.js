(angular => {
  'use strict';

  angular.module('app').component('appSelectChurchComponent', {
    templateUrl: '/views/components/select-church/select-church.html',
    controller: [
      '$route',
      '$mdSidenav',
      'UI',
      'authService',
      'churchService',
      'loginService',
      SelectChurch
    ]
  });

  function SelectChurch($route, $mdSidenav, UI, authService, churchService, loginService) {
    this.churches = [];

    this.$onInit = () => {
      authService.onUserChange(user => {
        this.user = user;
        loadChurches();
      });
    };

    const loadChurches = () => {
      if (!this.user) return;
      churchService.list().then(churches => {
        this.churches = churches.filter(c => c.roles.length);
      });
    };

    this.changeChurch = (church) => {
      if (church.id === this.user.church.id) {
        return $mdSidenav('left').toggle();
      }

      UI.Loader(loginService.changeChurch(church.id)).then(() => {
        $route.reload();
        $mdSidenav('left').toggle();
      }).catch(UI.Toast.httpHandler);
    };
  }

})(angular);