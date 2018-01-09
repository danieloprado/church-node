(angular => {
  'use strict';

  angular.module('app').component('appUserMenuComponent', {
    templateUrl: '/views/components/user-menu/user-menu.html',
    controller: [
      '$mdSidenav',
      'authService',
      'loginService',
      UserMenu
    ]
  });

  function UserMenu($mdSidenav, authService, loginService) {
    authService.onUserChange(user => {
      this.user = user;
    });

    this.changePassword = ($event) => {
      loginService.openChangePassword($event).then(() => {
        $mdSidenav('left').toggle();
      });
    };

    this.logout = () => {
      loginService.logout().then(() => {
        loginService.openLogin();
      });
    };
  }

})(angular);