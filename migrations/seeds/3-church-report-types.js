exports.seed = function(knex) {
  const types = ['Culto de Celebração', 'R.C.E'];

  return knex.select('id').from('Church').then(churches => {
    return churches.reduce((prev, church) => {

      return prev.then(() => {
        return knex.count('id').from('ChurchReportType').where({ churchId: church.id }).first();
      }).then(result => {
        if (result.count > 0) return;

        return types.reduce((prevType, name) => {
          return prevType.then(() => knex.insert({ name, churchId: church.id }).into('ChurchReportType'));
        }, Promise.resolve());

      });

    }, Promise.resolve());
  });

};