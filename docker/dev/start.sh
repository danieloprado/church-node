/bin/sh -c "
  while ! nc -z $DB_HOST $DB_PORT;
  do
    echo 'Waiting database';
    sleep 1;
  done;
  echo 'Database ready!'!;
"

npm rebuild node-sass

if [ ! -f "bin/services/bcrypt.js" ]; then
  npm run gulp server-compile
fi

npm run migrate
npm run develop