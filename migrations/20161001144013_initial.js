exports.up = function(knex) {
  return knex.schema.createTable('User', function(table) {
    table.increments('id').primary();
    table.string('firstName', 50).notNullable();
    table.string('lastName', 50).nullable();
    table.string('email', 150).nullable().unique();
    table.string('password', 72).nullable();
  }).createTable('Church', function(table) {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('slug', 30).notNullable();
    table.string('email', 150).unique();
    table.string('phone', 20).nullable();
    table.string('address', 150).nullable();
    table.float('latitude');
    table.float('longitude');
  }).createTable('ChurchUser', function(table) {
    table.integer('userId').notNullable().unsigned().references('id').inTable('User');
    table.integer('churchId').notNullable().unsigned().references('id').inTable('Church');
    table.string('roles', 1000).nullable();
    table.primary(['userId', 'churchId']);
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('ChurchUser')
    .dropTableIfExists('Church')
    .dropTableIfExists('User');
};