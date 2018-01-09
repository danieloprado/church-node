(angular => {
  'use strict';

  angular.module('app').component('appPagination', {
    template: `
      <md-table-pagination
        md-limit="$ctrl.model.limit"
        md-label="{page: 'Página:', rowsPerPage: 'itens por página:', of: 'de'}"
        md-limit-options="[10, 20, 50]"
        md-page="$ctrl.model.page"
        md-total="{{$ctrl.model.total}}"
        md-on-paginate="$ctrl.onPaginate"
        md-page-select="md-page-select">
      </md-table-pagination>
    `,
    controller: [
      '$scope',
      Controller
    ],
    bindings: {
      model: '='
    }
  });

  function Controller($scope) {
    this.onPaginate = () => {
      $scope.$emit('scroll-top');
    };
  }

})(angular);