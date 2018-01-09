exports.up = function(knex) {
  return knex.schema.createTable('UserSocial', function(table) {
    table.integer('userId').notNullable().unsigned().references('id').inTable('User');
    table.string('ref').notNullable();
    table.string('provider').notNullable();

    table.primary(['userId', 'provider']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('UserSocial');
};