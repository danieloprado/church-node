exports.up = function(knex) {
  return knex.schema.createTable('Event', function(table) {
    table.increments('id').primary();
    table.string('title', 100).notNullable();
    table.string('description', 1000);
    table.integer('churchId').notNullable().unsigned().references('id').inTable('Church');
  }).createTable('EventDate', function(table) {
    table.integer('eventId').notNullable().unsigned().references('id').inTable('Event');
    table.dateTime('beginDate').notNullable();
    table.dateTime('endDate').nullable();

    table.primary(['eventId', 'beginDate']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Event');
};