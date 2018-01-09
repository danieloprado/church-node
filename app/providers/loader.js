(angular => {
  'use strict';

  angular.module('app').factory('Loader', [
    '$q',
    '$rootScope',
    Loader
  ]);

  function Loader($q, $rootScope) {
    let disabled = 0;
    const promises = [];

    const emitChange = () => {
      const qtd = promises.length - disabled;
      $rootScope.$broadcast(qtd <= 0 ? 'loading-finished' : 'loading-started');
    };

    const getMinimumTime = () => {
      return $q(resolve => setTimeout(() => resolve(), 500));
    };

    const main = (promise) => {
      const minimumTime = getMinimumTime();

      if (angular.isArray(promise)) {
        promise = $q.all(promise);
      }

      promises.push(promise);

      promise.then(() => minimumTime).finally(() => {
        const index = promises.indexOf(promise);
        promises.splice(index, 1);

        emitChange();
      });

      emitChange();
      return promise;
    };

    main.enable = () => {
      if (disabled === 0) return;

      disabled--;
      emitChange();
    };

    main.disable = () => {
      if (promises.length === 0) return;

      disabled++;
      emitChange();
    };

    return main;
  }

})(angular);