(function(angular) {

  angular.module('appAuth').controller('appAuth.changePasswordCtrl', [
    '$mdDialog',
    'UI',
    'loginService',
    ChangePasswordCtrl
  ]);

  function ChangePasswordCtrl($mdDialog, UI, loginService) {
    this.model = {};

    this.submit = () => {
      UI.Loader(loginService.changePassword(this.model)).then(() => {
        UI.Toast('Senha atualizada com sucesso', 'success');
        $mdDialog.hide();
      }).catch(err => {
        if (err.data === 'invalid-password') {
          return UI.Toast('Senha atual inválida', 'error');
        }

        UI.Toast.httpHandler(err);
      });
    };

    this.cancel = () => {
      $mdDialog.cancel();
    };

  }

})(angular);