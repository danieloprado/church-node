exports.up = async function(knex) {
  await knex.schema.dropTable('NotificationUser');

  await knex.schema.table('UserDevice', function(table) {
    table.string('notificationToken', 250).nullable();
    table.renameColumn('uuid', 'currentToken');
  });
};

exports.down = async function(knex) {
  await knex.schema.table('UserDevice', function(table) {
    table.dropColumn('notificationToken');
    table.renameColumn('currentToken', 'uuid');
  });

  await knex.schema.createTable('NotificationUser', function(table) {
    table.uuid('notificationUserId').primary().notNullable();
    table.integer('userId').notNullable().unsigned().references('id').inTable('User');
  });
};