(function(angular) {
  'use strict';

  angular.module('appInformative').controller('appInformative.listCtrl', [
    '$scope',
    'UI',
    'informativeService',
    'query',
    ListCtrl
  ]);

  function ListCtrl($scope, UI, informativeService, query) {
    this.selected = [];
    this.types = [];
    this.pagination = { page: 1, limit: 10, total: 0 };

    this.query = query;
    query.order = query.order || '-date';

    this.dataPromise = informativeService.list().then((data) => {
      this.pagination.page = 1;
      this.pagination.total = data.length;
      this.informatives = data;
    }).catch(UI.Toast.httpHandler);

    informativeService.types().then(data => {
      this.types = data;
    }).catch(UI.Toast.httpHandler);

    this.delete = ($event, informative) => {
      UI.Confirm(`Deseja apagar o informativo **${informative.title}**`, $event).then(() => {
        return UI.Loader(informativeService.remove(informative.id));
      }).then(() => {
        this.informatives.splice(this.informatives.indexOf(informative), 1);
        this.pagination.total = this.informatives.length;
        UI.Toast('Excluído', 'success');
      }).catch(error => {
        if (error.isConfirm) return;
        UI.Toast('Não foi possível apagar o informativo', 'error');
      });
    };
  }

})(angular);