((angular) => {
  'use strict';

  angular.module('appChurchReport').controller('appChurchReport.formCtrl', [
    '$filter',
    '$mdDialog',
    'UI',
    'churchReportService',
    'report',
    FormCtrl
  ]);

  function FormCtrl($filter, $mdDialog, UI, churchReportService, report) {
    this.types = [];
    this.model = report || {
      title: `Culto de ${$filter('date')(new Date(), 'EEEE').replace('-feira', '')}`,
      date: new Date()
    };

    UI.Loader(churchReportService.types()).then(types => {
      this.types = types;
    }).catch(UI.Toast.httpHandler);

    this.cancel = () => {
      $mdDialog.cancel();
    };

    this.submit = () => {
      return UI.Loader(churchReportService.save(this.model)).then(report => {
        UI.Toast('Salvo', 'success');
        $mdDialog.hide(report);
      }).catch(error => UI.Toast.httpHandler(error));
    };
  }

})(angular);