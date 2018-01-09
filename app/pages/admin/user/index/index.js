(function(angular) {
  'use strict';

  angular.module('appUser').controller('appUser.listCtrl', [
    '$scope',
    'UI',
    'userService',
    'query',
    ListCtrl
  ]);

  function ListCtrl($scope, UI, userService, query) {
    this.users = [];
    this.loading = true;
    this.pagination = { page: 1, limit: 10, total: 0 };

    this.query = query;
    query.order = query.order || 'fullName';

    this.$onInit = () => {
      this.get();

      $scope.$on('user-form', (info, { user, $event }) => {
        this.form(user, $event);
      });

      $scope.$on('user-details', (info, { user, $event }) => {
        this.details(user, $event);
      });

      $scope.$on('user-delete', (info, { user, $event }) => {
        this.delete(user, $event);
      });

      $scope.$on('user-become-member', (info, { user, $event }) => {
        this.becomeMember(user, $event);
      });
    };

    this.get = () => {
      this.loading = true;
      userService.list().then((users) => {
        this.pagination.page = 1;
        this.pagination.total = users.length;

        this.users = users;
        this.totals = {
          members: users.filter(u => u.isMember).length,
          total: users.length
        };
        this.totals.nonMembers = this.totals.total - this.totals.members;
      }).catch(UI.Toast.httpHandler).finally(() => {
        this.loading = false;
      });

      return this.dataPromise;
    };

    this.form = (user, $event) => {
      userService.form(user, $event).then(newUser => {
        if (user) {
          angular.extend(user, newUser);
          return;
        }

        this.users.push(newUser);
      });
    };

    this.details = (user, $event) => {
      userService.details(user, $event);
    };

    this.delete = (user, $event) => {
      UI.Confirm(`Deseja apagar o membro **${user.fullName}**?`, $event).then(() => {
        return UI.Loader(userService.remove(user.id));
      }).then(() => {
        this.users.splice(this.users.indexOf(user), 1);
        this.pagination.total = this.users.length;
        UI.Toast('Excluído', 'success');
      }).catch(error => {
        if (error.isConfirm) return;

        switch ((error.data || {}).message) {
          case 'not-allowed-remove-current-user':
            UI.Toast('Não é possível apagar o usuário logado', 'error');
            break;
          case 'not-allowed-sysAdmin':
            UI.Toast('Não é possível apagar esse membro específico', 'error');
            break;
          default:
            UI.Toast.httpHandler(error);

        }
      });
    };

    this.becomeMember = (user) => {
      UI.Loader(userService.becomeMember(user.id)).then(() => {
        user.isMember = true;
        $scope.$broadcast('user-collection-updated');
      }).catch(error => {
        UI.Toast.httpHandler(error);
      });
    };

    this.$onInit();
  }

})(angular);