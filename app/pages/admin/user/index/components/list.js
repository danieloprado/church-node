(function(angular) {
  'use strict';

  angular.module('appUser').component('appUserListComponent', {
    templateUrl: '/views/pages/admin/user/index/components/list.html',
    controller: [
      '$scope',
      ListCtrl
    ],
    bindings: {
      query: '=',
      allUsers: '=users',
      isMember: '<'
    }
  });

  function ListCtrl($scope) {
    this.pagination = { page: 1, limit: 10, total: 0 };

    this.$onInit = () => {
      const updateUsers = () => {
        this.users = this.allUsers.filter(u => u.isMember === this.isMember);
        this.pagination.total = this.users.length;
      };

      $scope.$watchCollection(() => this.allUsers, updateUsers);
      $scope.$on('user-collection-updated', updateUsers);
    };

    this.form = (user, $event) => {
      $scope.$emit('user-form', { user, $event });
    };

    this.details = (user, $event) => {
      $scope.$emit('user-details', { user, $event });
    };

    this.delete = (user, $event) => {
      $scope.$emit('user-delete', { user, $event });
    };

    this.becomeMember = (user, $event) => {
      $scope.$emit('user-become-member', { user, $event });
    };

  }

})(angular);