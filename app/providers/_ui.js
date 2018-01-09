(angular => {
  'use strict';

  angular.module('app').factory('UI', UI);

  function UI(Loader, Toast, Confirm) {
    return { Loader, Toast, Confirm };
  }
  UI.$inject = ['Loader', 'Toast', 'Confirm'];

})(angular);
