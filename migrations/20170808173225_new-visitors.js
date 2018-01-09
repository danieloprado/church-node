exports.up = async function(knex) {
  await knex.schema.createTable('Quiz', table => {
    table.increments('id').primary();
    table.string('purpose').notNullable();
    table.integer('churchId').notNullable().unsigned().references('id').inTable('Church');
    table.integer('version').notNullable().unsigned().defaultTo(1);
    table.json('questions').notNullable();

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });

  await knex.schema.createTable('QuizAnswer', table => {
    table.increments('id').primary();
    table.integer('quizId').notNullable().unsigned().references('id').inTable('Quiz');
    table.integer('quizVersion').notNullable();
    table.json('answers').notNullable();

    table.integer('createdBy').nullable().unsigned().references('id').inTable('User');
    table.integer('refersTo').nullable().unsigned().references('id').inTable('User');

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('QuizAnswer');
  await knex.schema.dropTableIfExists('Quiz');
};