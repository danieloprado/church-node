exports.up = async function(knex) {
  await knex.schema.table('ChurchUser', table => {
    table.boolean('isMember').notNullable().defaultTo(false);
    table.index(['churchId', 'isMember']);
  });

  await knex('ChurchUser').update({ isMember: true });
};

exports.down = async function(knex) {
  await knex.schema.alterTable('ChurchUser', table => {
    table.dropColumn('isMember');
  });
};