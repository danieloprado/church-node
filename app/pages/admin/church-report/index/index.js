(function(angular) {
  'use strict';

  angular.module('appChurchReport').controller('appChurchReport.indexCtrl', [
    '$scope',
    'moment',
    'UI',
    'churchReportService',
    'query',
    IndexCtrl
  ]);

  function IndexCtrl($scope, moment, UI, churchReportService, query) {
    this.query = query;

    this.$onInit = () => {
      UI.Loader(churchReportService.types()).then(data => {
        this.types = data;

        this.query = {
          beginDate: this.query.beginDate || moment().add(-1, 'month').toDate(),
          endDate: this.query.endDate || moment().toDate(),
          typeIds: this.query.typeIds || data.map(d => d.id)
        };

        return this.search();
      }).catch(UI.Toast.httpHandler);

      $scope.$on('church-report-form', (info, { report, $event }) => {
        this.form(report, $event);
      });

      $scope.$on('church-report-delete', (info, { report, $event }) => {
        this.delete(report, $event);
      });
    };

    this.search = () => {
      return UI.Loader(churchReportService.list(this.query)).then((data) => {
        this.reports = data;
      }).catch(UI.Toast.httpHandler);
    };

    this.form = (report, $event) => {
      churchReportService.form(report, $event).then(() => {
        this.search();
      });
    };

    this.delete = (report, $event) => {
      UI.Confirm(`Deseja apagar o relatório **${report.title}**`, $event).then(() => {
        return UI.Loader(churchReportService.remove(report.id));
      }).then(() => {
        this.reports.splice(this.reports.indexOf(report), 1);
        UI.Toast('Excluído', 'success');
      }).catch(error => {
        if (error.isConfirm) return;
        console.error(error);
        UI.Toast('Não foi possível apagar o relatório', 'error');
      });
    };

    this.$onInit();
  }

})(angular);