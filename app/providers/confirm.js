(angular => {
  'use strict';

  angular.module('app').factory('Confirm', Confirm);

  function Confirm($q, $mdDialog, marked) {

    return (message, $event) => {
      const confirm = $mdDialog.confirm()
        .title('Confirmar')
        .htmlContent(marked(message))
        .targetEvent($event)
        .ok('Sim')
        .cancel('Não');

      return $mdDialog.show(confirm).catch(() => $q.reject({ isConfirm: true }));
    };

  }
  Confirm.$inject = ['$q', '$mdDialog', 'marked'];


})(angular);