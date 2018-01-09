(angular => {
  'use strict';

  angular.module('app').factory('ComponentTemplate', ComponentTemplate);

  function ComponentTemplate(lodash) {
    const resolveParams = (resolveItems) => {
      if (!resolveItems) return '';

      return Object.keys(resolveItems).reduce((acc, key) => {
        acc.push(`${lodash.kebabCase(key)}='${key}'`);
        return acc;
      }, []).join(' ');

    };

    return (componentName, data) => {
      return `<${lodash.kebabCase(componentName)} ${resolveParams(data)} cancel="cancel($data)" complete="complete($data)" />`;
    };

  }
  ComponentTemplate.$inject = ['lodash'];

})(angular);
