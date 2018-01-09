Chuch`s App - Api
=========

## Technologies

* Gulp for compile task
* Docker
* Knex (Database Code First)
* Bitbucket Pipelines for CI

### Back-End
* Node
* Typescript
* Postgres (Knex + Objection.js) 
* Pug + Css Inline (Templates)
* Login Facebook/Google
* Firebase Notification

### Front-End
* AngularJS (migrating to React in new version)
* Angular Material

## For Dev

```bash
# install depedencies
npm run develop-update 

#run
docker-compose up
```

## Publishing
```bash
# install deps
npm run publish-deps

# run tests
npm test

# generate files in folder publish
npm run publish

# build docker
cd publish
docker build -t danieloprado/church-api:latest -f Dockerfile .
```

