exports.up = async function(knex) {
  await knex.schema.alterTable('User', table => {
    table.string('neighborhood', 100).nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable('User', table => {
    table.dropColumn('neighborhood');
  });
};