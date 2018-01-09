exports.up = function(knex) {
  return knex.schema.createTable('ChurchReportType', table => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.integer('churchId').notNullable().unsigned().references('id').inTable('Church');
  }).createTable('ChurchReport', table => {
    table.increments('id').primary();
    table.integer('churchId').notNullable().unsigned().references('id').inTable('Church');
    table.integer('typeId').notNullable().unsigned().references('id').inTable('ChurchReportType');
    table.integer('creatorId').notNullable().unsigned().references('id').inTable('User');
    table.string('title', 100).notNullable();
    table.integer('totalMembers').notNullable();
    table.integer('totalNewVisitors').notNullable();
    table.integer('totalFrequentVisitors').notNullable();
    table.integer('totalKids').notNullable();
    table.dateTime('date');
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('ChurchReport')
    .dropTableIfExists('ChurchReportType');
};