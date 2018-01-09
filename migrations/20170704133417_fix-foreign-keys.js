exports.up = async function(knex) {
  if (process.env.NODE_ENV === 'test') return;

  await knex.schema.table('UserSocial', (table) => {
    table.dropForeign(['userId']);
    table.foreign('userId').references('id').inTable('User').onDelete('CASCADE');
  });

  await knex.schema.table('ChurchUser', (table) => {
    table.dropForeign(['userId']);
    table.foreign('userId').references('id').inTable('User').onDelete('CASCADE');
  });

  await knex.schema.table('UserDevice', (table) => {
    table.dropForeign(['userId']);
    table.foreign('userId').references('id').inTable('User').onDelete('CASCADE');
  });

  await knex.schema.table('NotificationUser', (table) => {
    table.dropForeign(['userId']);
    table.foreign('userId').references('id').inTable('User').onDelete('CASCADE');
  });

  await knex.schema.table('EventDate', (table) => {
    table.dropForeign(['eventId']);
    table.foreign('eventId').references('id').inTable('Event').onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.table('UserSocial', (table) => {
    table.dropForeign(['userId']);
    table.foreign('userId').references('id').inTable('User');
  });
};