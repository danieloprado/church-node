(function(angular) {
  'use strict';

  angular.module('appAuth').controller('appAuth.newPasswordCtrl', [
    '$location',
    'jwtHelper',
    'UI',
    'loginService',
    NewPasswordCtrl
  ]);

  function NewPasswordCtrl($location, jwtHelper, UI, loginService) {
    this.currentTab = 0;
    this.isExpired = false;
    this.data;
    this.model = {};
    this.model.token = $location.search().t;

    if (!this.model.token) {
      $location.path('/');
      return;
    }

    this.isExpired = jwtHelper.isTokenExpired(this.model.token);
    this.data = jwtHelper.decodeToken(this.model.token);

    this.submit = () => {
      UI.Loader(loginService.resetPassword(this.model.token, this.model.password)).then(() => {
        return this.login();
      }).then(() => {
        UI.Toast('Senha alterada com sucesso!', 'success');
        $location.path('/');
      }).catch(UI.Toast.httpHandler);
    };

    this.login = () => {
      const model = { email: this.data.email, password: this.model.password };
      const loginPromise = UI.Loader(loginService.login(model));

      loginPromise.catch(() => {
        this.currentTab = 1;
      });

      return loginPromise;
    };
  }

})(angular);