(function(angular) {
  'use strict';

  angular.module('appVisitor').component('appVisitorFormComponent', {
    templateUrl: '/views/pages/admin/visitor/index/form/form.html',
    controller: [
      FormCtrl
    ],
    bindings: {}
  });

  function FormCtrl() {
    this.model = { questions: [] };

    console.log('oi');
  }

})(angular);