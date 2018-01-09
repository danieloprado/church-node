exports.up = function(knex) {
  return knex.schema.alterTable('ChurchUser', table => {
    table.dateTime('lastAppDateAccess').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.createTable('ChurchUser', table => {
    table.dropColumn('lastAppDateAccess');
  });
};