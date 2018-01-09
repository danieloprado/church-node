(angular => {
  'use strict';

  angular.module('app').component('appNavMenuComponent', {
    templateUrl: '/views/components/nav-menu/nav-menu.html',
    controller: [
      NavMenu
    ]
  });

  function NavMenu() {}

})(angular);