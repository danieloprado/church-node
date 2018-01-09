exports.up = async function(knex) {
  await knex.schema.alterTable('User', table => {
    table.string('zipcode', 8).nullable();
    table.string('address', 150).nullable();
    table.string('city', 100).nullable();
    table.string('state', 2).nullable();
    table.string('number', 10).nullable();
    table.string('complement', 10).nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable('User', table => {
    table.dropColumn('zipcode');
    table.dropColumn('address');
    table.dropColumn('city');
    table.dropColumn('state');
    table.dropColumn('number');
    table.dropColumn('complement');
  });
};