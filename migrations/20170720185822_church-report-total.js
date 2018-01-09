exports.up = async function(knex) {
  await knex.schema.table('ChurchReport', (table) => {
    table.integer('total').notNullable().defaultTo(0);
  });

  const reports = await knex('ChurchReport');

  for (let report of reports) {
    report.total = report.totalMembers + report.totalNewVisitors + report.totalFrequentVisitors + report.totalKids;
    await knex('ChurchReport').update(report).where({ id: report.id });
  }
};

exports.down = async function(knex) {
  await knex.schema.table('ChurchReport', (table) => {
    table.dropColumn('total');
  });
};