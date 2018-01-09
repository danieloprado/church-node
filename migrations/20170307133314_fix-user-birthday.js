exports.up = async function(knex) {
  const users = await knex.select('id', 'birthday').from('User').whereNotNull('birthday');

  await knex.schema.alterTable('User', table => {
    table.dropColumn('birthday');
  });

  await knex.schema.alterTable('User', table => {
    table.datetime('birthday').nullable();
  });

  for (let user of users) {
    await knex('User')
      .update({ birthday: user.birthday })
      .where({ id: user.id });
  }
};

exports.down = async function(knex) {
  const users = await knex.select('id', 'birthday').from('User').whereNotNull('birthday');

  await knex.schema.alterTable('User', table => {
    table.dropColumn('birthday');
  });

  await knex.schema.alterTable('User', table => {
    table.date('birthday').nullable();
  });

  for (let user of users) {
    await knex('User')
      .update({ birthday: user.birthday })
      .where({ id: user.id });
  }
};