exports.up = function(knex) {
  return knex.schema.createTable('UserDevice', function(table) {
    table.integer('userId').notNullable().unsigned().references('id').inTable('User');
    table.string('deviceId', 150).notNullable();
    table.string('application', 150).notNullable();
    table.string('name', 150).notNullable();
    table.uuid('uuid').notNullable();

    table.primary(['userId', 'deviceId', 'application']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('UserDevice');
};