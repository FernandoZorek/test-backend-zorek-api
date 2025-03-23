module.exports = {
  type: process.env.DB_TYPE || 'sqlite',
  database: process.env.DB_DATABASE || './data/database.sqlite',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};