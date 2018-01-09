(function(angular) {

  angular.module('appInformative').filter('informativeTypeIcon', [
    'informativeService',
    TypeFilter
  ]);

  function TypeFilter(informativeService) {
    let types = [];
    informativeService.types().then(data => {
      types = data;
    });

    const filter = (value) => {
      return types.filter(t => t.id === value).map(t => t.icon)[0];
    };

    filter.$stateful = true;
    return filter;
  }
})(angular);