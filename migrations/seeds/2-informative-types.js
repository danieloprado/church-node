exports.seed = function(knex) {
  const types = [{ id: 1, name: 'Igreja' }, { id: 2, name: 'Célula' }];
  return create(knex, types, 0);
};

function create(knex, types, index) {
  if (index === types.length) return;
  const type = types[index];

  return knex.select('id').from('InformativeType').where({ id: type.id }).then(data => {
    if (data.length > 0) return;
    return knex.insert(type).into('InformativeType');
  }).then(() => {
    return create(knex, types, ++index);
  });
}