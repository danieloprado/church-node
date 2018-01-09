(angular => {
  'use strict';

  angular.module('appChurchReport').component('appChurchReportIndexListComponent', {
    templateUrl: '/views/pages/admin/church-report/index/components/list.html',
    controller: [
      '$scope',
      Component
    ],
    bindings: {
      reports: '='
    }
  });

  function Component($scope) {
    this.selected = [];
    this.types = [];
    this.pagination = { page: 1, limit: 10, total: 0 };

    this.$onInit = () => {
      $scope.$on('church-report-search', (info, query) => {
        return this.list(query);
      });

      $scope.$watchCollection(() => this.reports, () => {
        if (!this.reports) return;

        this.pagination.page = 1;
        this.pagination.total = this.reports.length;
      });
    };

    this.form = (report, $event) => {
      $scope.$emit('church-report-form', { report, $event });
    };

    this.delete = (report, $event) => {
      $scope.$emit('church-report-delete', { report, $event });
    };
  }

})(angular);