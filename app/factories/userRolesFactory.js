(function(angular) {
  'use strict';

  angular.module('app').factory('userRolesFactory', [
    UserRolesFactory
  ]);

  function UserRolesFactory() {
    const rolesMap = {
      admin: {
        name: 'Administrador',
        description: 'Tem total poder sobre as informações e acessos'
      },
      contentManager: {
        name: 'Gestor de Conteúdo',
        description: 'Gerencia os informativos da igreja/célula e os eventos próximos'
      },
      churchReport: {
        name: 'Relatório do Culto',
        description: 'Responsável pela criação dos relatórios do culto'
      },
      peopleManager: {
        name: 'Gestor de Membros',
        description: 'Gerencia os membros da igreja, todos os usuários tem acesso a lista de membros mas apenas este pode alterá-los'
      }
    };

    return (roles) => {
      return roles.reduce((acc, role) => {
        const desc = rolesMap[role] || { name: role };

        if (desc) {
          acc.push({
            value: role,
            name: desc.name,
            description: desc.description
          });
        }

        return acc;
      }, []);
    };

  }

})(angular);