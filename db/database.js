// const { Pool } = require('pg');

// const db = new Pool({
//   connectionString: process.env.DATABASE_URL, // Use the Heroku DATABASE_URL environment variable
//   ssl: {
//     rejectUnauthorized: false, // Disable SSL verification for development
//   },
// });

// db.connect()

// module.exports = db;

const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect()

module.exports = db;