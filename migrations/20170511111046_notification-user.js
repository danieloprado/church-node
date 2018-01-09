exports.up = function(knex) {
  return knex.schema.createTable('NotificationUser', function(table) {
    table.uuid('notificationUserId').primary().notNullable();
    table.integer('userId').notNullable().unsigned().references('id').inTable('User');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('NotificationUser');
};