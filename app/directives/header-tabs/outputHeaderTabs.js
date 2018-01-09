(function(angular) {
  'use strict';

  angular.module('app').run(['$rootScope', $rootScope => {
    $rootScope.headerTabs = {
      current: 0,
      tabs: []
    };
  }]).directive('outputHeaderTabs', [
    '$rootScope',
    directive
  ]);

  function directive($rootScope) {

    return {
      restrict: 'E',
      scope: false,
      template: `
      <md-toolbar ng-show="headerTabs.tabs.length > 0">
        <md-tabs md-selected="headerTabs.current">
          <div ng-repeat="tab in headerTabs.tabs">
            <md-tab ng-disabled="tab.disabled">{{tab.label}}</md-tab>
          </div>
        </md-tabs>
      </md-toolbar>`,
      link: () => {
        $rootScope.$on('$routeChangeStart', () => {
          $rootScope.headerTabs.current = 0;
          $rootScope.headerTabs.tabs = [];
        });

        $rootScope.$on('change-header-tab-current', (info, data) => {
          $rootScope.headerTabs.current = data;
        });

        $rootScope.$on('change-header-tab', (info, tabs) => {
          $rootScope.headerTabs.current = 0;
          $rootScope.headerTabs.tabs = tabs;
        });

        $rootScope.$watch('headerTabs.current', () => {
          setTimeout(() => angular.element('#main > .scroll-y').animate({ scrollTop: 0 }, 300), 100);
        });
      }
    };

  }

})(angular);