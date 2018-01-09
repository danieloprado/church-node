exports.up = function(knex) {
  return knex.schema.createTable('InformativeType', function(table) {
    table.integer('id').notNullable().unsigned().primary();
    table.string('name', 100).notNullable();
  }).createTable('Informative', function(table) {
    table.increments('id').primary();
    table.string('title', 100).notNullable();
    table.dateTime('date').notNullable();
    table.text('message').notNullable();
    table.integer('creatorId').notNullable().unsigned().references('id').inTable('User');
    table.integer('churchId').notNullable().unsigned().references('id').inTable('Church');
    table.integer('typeId').notNullable().unsigned().references('id').inTable('InformativeType');
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Informative')
    .dropTableIfExists('InformativeType');
};