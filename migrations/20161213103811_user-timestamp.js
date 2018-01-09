exports.up = function(knex) {
  return knex.schema.table('User', function(table) {
    table.dateTime('createdDate').nullable();
    table.dateTime('updatedDate').nullable();
  }).then(() => {
    return knex('User')
      .whereNull('createdDate')
      .update({ createdDate: new Date() });
  }).then(() => {
    return knex('User')
      .whereNull('updatedDate')
      .update({ updatedDate: new Date() });
  });
};

exports.down = function(knex) {
  return knex.schema.table('User', function(table) {
    table.dropColumn('createdDate');
    table.dropColumn('updatedDate');
  });
};