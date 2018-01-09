const marked = require('marked');

exports.up = async function(knex) {
  const informatives = await knex('Informative');

  for (let informative of informatives) {
    informative.message = marked(informative.message);
    await knex('Informative').update(informative).where({ id: informative.id });
  }
};

exports.down = function() {};