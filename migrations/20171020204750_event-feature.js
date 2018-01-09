exports.up = async function(knex) {
  await knex.schema.table('Event', table => {
    table.boolean('featured').notNullable().defaultTo(false);
    table.string('featuredText', 200);
    table.string('image', 50);
    table.boolean('enableQuiz').notNullable().defaultTo(false);
    table.integer('quizId').references('id').inTable('Quiz').onDelete('SET NULL');
  });
};

exports.down = async function(knex) {
  await knex.schema.table('Event', table => {
    table.dropColumn('featured');
    table.dropColumn('featuredText');
    table.dropColumn('image');
    table.dropColumn('quizId');
  });
};