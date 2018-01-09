module.exports = {

  development: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      database: process.env.DATABASE_DB || 'church',
      user: process.env.DATABASE_USER || 'docker',
      password: process.env.DATABASE_PASSWORD || 'xqi6V3NQ7V',
      port: process.env.DATABASE_PORT || 3002
    },
    seeds: {
      directory: './migrations/seeds'
    },
    debug: false
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    seeds: {
      directory: './migrations/seeds'
    },
    debug: false
  },

  production: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DB,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './migrations/seeds'
    },
  }

};