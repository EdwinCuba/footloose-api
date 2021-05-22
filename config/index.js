require('dotenv-flow').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  secret: process.env.SECRET,
  roles: process.env.ROLES
}

module.exports = { config }