(function(angular) {

  angular.module('app').filter('roles', [
    'userService',
    Roles
  ]);

  function Roles(userService) {
    let roles = [];
    userService.roles().then(data => {
      roles = data;
    });

    const filter = (value) => {
      return roles.filter(r => value.indexOf(r.value) > -1).map(t => t.name).join(', ');
    };

    filter.$stateful = true;
    return filter;
  }
})(angular);