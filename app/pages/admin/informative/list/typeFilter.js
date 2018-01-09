(function(angular) {

  angular.module('appInformative').filter('informativeType', [
    'informativeService',
    TypeFilter
  ]);

  function TypeFilter(informativeService) {
    let types = [];
    informativeService.types().then(data => {
      types = data;
    });

    const filter = (value) => {
      return types.filter(t => t.id === value).map(t => t.name)[0];
    };

    filter.$stateful = true;
    return filter;
  }
})(angular);
