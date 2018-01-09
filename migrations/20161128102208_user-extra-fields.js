exports.up = function(knex) {
  return knex.schema.table('User', function(table) {
    table.integer('marriedId').nullable().unsigned().references('id').inTable('User');
    table.string('avatar', 2000).nullable();
    table.date('birthday').nullable();
    table.string('gender', 1).nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('User', function(table) {
    table.dropColumn('marriedId');
    table.dropColumn('avatar');
    table.dropColumn('birthday');
    table.dropColumn('gender');
  });
};