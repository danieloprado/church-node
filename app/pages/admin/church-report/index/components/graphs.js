(angular => {
  'use strict';

  angular.module('appChurchReport').component('appChurchReportIndexGraphsComponent', {
    templateUrl: '/views/pages/admin/church-report/index/components/graphs.html',
    controller: [
      Component
    ],
    bindings: {
      reports: '='
    }
  });

  function Component() {}

})(angular);