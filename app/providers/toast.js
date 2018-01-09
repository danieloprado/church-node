(angular => {
  'use strict';

  angular.module('app').factory('Toast', [
    '$mdToast',
    Toast
  ]);

  function Toast($mdToast) {
    let toast, promise;

    const obj = (message, className) => {
      toast = $mdToast.simple()
        .textContent(message)
        .hideDelay(10000)
        .toastClass('md-toast-' + className)
        .position('top right')
        .action('OK');

      promise = $mdToast.show(toast);
      promise.finally(() => {
        toast = null;
      });

      return promise;
    };

    obj.genericError = (err) => {
      if (err) console.error(err); // eslint-disable-line
      return obj('Aconteceu um erro inesperado...', 'error');
    };

    obj.userChanged = () => {
      return obj('O usuário foi alterado, seu trabalho não foi salvo.', 'error');
    };

    obj.notFound = () => {
      return obj('Não encontrado', 'error');
    };

    obj.httpHandler = (res) => {
      switch (res.status) {
        case 400:
          return obj('Dados inválidos', 'error');
        case 401:
          return obj.userChanged();
        case 403:
          return obj('Você não tem permissão de acesso', 'error');
        case 404:
          return obj.notFound();
        default:
          return obj.genericError(res);
      }
    };

    return obj;

  }


})(angular);