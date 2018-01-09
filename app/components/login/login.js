(angular => {
  'use strict';

  angular.module('app').component('appLoginComponent', {
    templateUrl: '/views/components/login/login.html',
    controller: [
      '$location',
      'UI',
      'authService',
      'loginService',
      Login
    ],
    bindings: {
      cancel: '&',
      complete: '&'
    }
  });

  function Login($location, UI, authService, loginService) {
    this.model = {};
    this.lockUser = false;
    this.currentTab = 0;

    this.$onInit = () => {
      if (authService.hasToken()) {
        this.model.email = authService.getUser().email;
        this.lockUser = true;
      }

      const message = $location.search().m;
      if (message) {
        this.showError(message);
        $location.search('m', null);
      }
    };

    this.changeUser = $event => {
      UI.Confirm('Trocar de usuário? \n\n Ao trocar de usuário todas as informações não salvas serão perdidas', $event)
        .then(() => {
          this.cancel();
          loginService.logout();
        });
    };

    this.login = () => {
      UI.Loader(loginService.login(this.model))
        .then(() => this.complete())
        .catch(error => {
          if (error.status === 405) {
            this.showError('user-no-access');
            return;
          }

          UI.Toast.httpHandler(error);
        });
    };

    this.recoveryAccess = () => {
      UI.Loader(loginService.sendReset(this.model.email)).then(() => {
        this.model.email = '';
        this.model.password = '';
        this.currentTab = 2;
      }).catch(error => {
        if (error.status === 404) {
          return UI.Toast('Não encontramos seu email', 'error');
        }

        UI.Toast.httpHandler(error);
      });
    };

    this.loginSocial = (provider) => {
      window.location = loginService.urlLoginSocial(provider);
    };

    this.showError = reason => {
      this.currentTab = 3;

      switch (reason) {
        case 'user-no-access':
          this.errorMessage = 'Você não possui acesso ao sistema, em caso de dúvida por favor contate o administrador.';
          break;
        case 'invalid-token':
          this.errorMessage = 'Token de acesso inválido, isso pode ocorre quando suas informações não são válidas';
          break;
        case 'user-not-found':
          this.errorMessage = 'Não encontramos o seu usuário, para ter acesso atráves de sua rede social é necessário estar previamente cadastrado';
          break;
        default:
          this.errorMessage = 'Erro inesperado';
      }
    };

  }

})(angular);