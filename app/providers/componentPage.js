(angular => {
  'use strict';

  angular.module('app').factory('componentPage', ComponentPage);

  function ComponentPage($rootScope, $q, componentTemplate) {

    return (component, resolve) => {

      const defer = $q.defer();
      const $scope = $rootScope.$new();
      const template = componentTemplate(component, resolve);

      angular.extend($scope, resolve);

      $scope.cancel = ($data) => {
        defer.reject($data);
        $rootScope.$broadcast('hide-component-page');
      };

      $scope.complete = ($data) => {
        defer.resolve($data);
        $rootScope.$broadcast('hide-component-page');
      };

      $rootScope.$broadcast('show-component-page', { template, $scope });
      return defer.promise;
    };

  }
  ComponentPage.$inject = ['$rootScope', '$q', 'ComponentTemplate'];


})(angular);