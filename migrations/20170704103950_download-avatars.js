const uuid = require('uuid'),
  fs = require('fs'),
  request = require('request');

exports.up = async function(knex) {
  if (process.env.NODE_ENV === 'test') return;

  const users = await knex('User').where('avatar', 'ilike', 'http%');

  for (let user of users) {
    const avatar = await downloadPicture(user.avatar);
    await knex('User').update({ avatar }).where({ id: user.id });
  }

};

exports.down = async function() {

};

async function downloadPicture(url) {
  return new Promise((resolve, reject) => {
    if (url === 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=200') {
      resolve(null);
      return;
    }

    request(url)
      .on('response', res => {
        if (res.statusCode > 199 && res.statusCode < 300 && res.headers['content-type'].startsWith('image')) {
          const filename = `${uuid()}.${res.headers['content-type'].split('/').pop()}`;
          res.pipe(fs.createWriteStream(`upload/${filename}`));
          resolve(filename);
          return;
        }

        resolve(null);
      })
      .on('error', err => reject(err));
  });
}