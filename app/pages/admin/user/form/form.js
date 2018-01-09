((angular) => {
  'use strict';

  angular.module('appUser').controller('appUser.formCtrl', [
    '$mdDialog',
    'UI',
    'userService',
    'user',
    FormCtrl
  ]);

  function FormCtrl($mdDialog, UI, userService, user) {
    this.model = user || {};
    this.tab = user ? 1 : 0;

    UI.Loader(userService.roles()).then(roles => {
      this.roles = angular.copy(roles);
      this.checkModelRoles();
    }).catch(UI.Toast.httpHandler);

    this.cancel = () => {
      $mdDialog.cancel();
    };

    this.submit = () => {
      return this.save();
    };

    this.save = () => {
      this.model.roles = this.roles.filter(r => r.selected).map(x => x.value);
      return UI.Loader(userService.save(this.model)).then(user => {
        UI.Toast('Salvo', 'success');
        $mdDialog.hide(user);
      }).catch(error => UI.Toast.httpHandler(error));
    };

    this.checkModelRoles = () => {
      if (!this.model.roles) return;
      this.roles.forEach(r => r.selected = this.model.roles.indexOf(r.value) > -1);
    };
  }

})(angular);