exports.seed = function(knex) {
  'use strict';
  let adminUser;

  return createAdminUser(knex).then(user => {
    adminUser = user;
    return createChurches(knex);
  }).then(churches => {
    return grantUserAcess(knex, adminUser, churches);
  });
};

function createAdminUser(knex) {
  const adminUser = {
    firstName: 'Daniel',
    lastName: 'Prado',
    email: 'danielprado.ad@gmail.com',
    password: 'senha@123',
    createdDate: new Date(),
    updatedDate: new Date()
  };

  return knex.select(['id', 'password']).from('User').where({ email: adminUser.email }).then(users => {
    if (users.length > 0) return users[0].id;

    return require('../../bin/services/bcrypt').hash(adminUser.password).then(password => {
      adminUser.password = password;
      return knex.insert(adminUser).returning('id').into('User');
    }).then(res => res[0]);

  }).then(userId => {
    adminUser.id = userId;
    return adminUser;
  });
}

function createChurches(knex) {
  const churches = [{
    name: 'ICB Sorocaba',
    slug: 'icb-sorocaba',
    phone: '1533426043',
    address: 'R. Cesário Mota, 217 - Centro, Sorocaba - SP, 18035-200, Brasil',
    latitude: -23.5028451,
    longitude: -47.46187259999999
  }];

  return knex.count('id as count').from('Church').then(result => {
    if (result[0].count > 0) return;
    return knex.insert(churches).into('Church');
  }).then(() => {
    return knex.select('*').from('Church');
  });
}

function grantUserAcess(knex, user, churches) {
  const data = churches.map(church => {
    return {
      userId: user.id,
      churchId: church.id,
      roles: 'sysAdmin'
    };
  });

  return knex.select('churchId').from('ChurchUser').where({ userId: user.id }).then(result => {
    const rowsToIntert = data.filter(d => !result.some(c => c.churchId === d.churchId));

    if (rowsToIntert.length === 0) return;
    return knex.insert(rowsToIntert).into('ChurchUser');
  });
}