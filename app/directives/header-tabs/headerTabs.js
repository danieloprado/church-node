(function() {
  'use strict';

  angular.module('app').directive('headerTabs', [
    '$compile',
    '$rootScope',
    directive
  ]);

  function directive($compile, $rootScope) {

    return {
      restrict: 'A',
      scope: false,
      priority: 1,
      replace: false,
      terminal: true,
      compile: (tElement, tAttrs) => {
        tElement.removeAttr('header-tabs');
        angular.element(tElement).addClass('header-tabs-content');
        tAttrs.$set('md-selected', 'headerTabs.current');
        tAttrs.$set('md-swipe-content', '');

        const $tabScope = tElement.scope();

        return {
          pre: (scope, iElement) => {
            let tabs = [];

            if (tAttrs.headerTabs && tAttrs.headerTabs !== 'header-tabs') {
              scope.$watchCollection(tAttrs.headerTabs, tabs => {
                $rootScope.$emit('change-header-tab', tabs);
              });
            }

            iElement.find('md-tab').each((key, elem) => {
              elem = angular.element(elem);
              const tab = { label: elem.attr('label'), disabled: false };
              const ngDisabled = elem.attr('ng-disabled');

              if (ngDisabled) {
                $tabScope.$watch(ngDisabled, (value) => tab.disabled = value);
              }

              tabs.push(tab);
            });

            $compile(iElement)(scope);
            $rootScope.$emit('change-header-tab', tabs);
          }
        };
      }
    };

  }

})();