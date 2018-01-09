exports.up = function(knex) {
  return knex.schema.table('Church', function(table) {
    table.json('social').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('Church', function(table) {
    table.dropColumn('social');
  });
};