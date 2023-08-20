const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the Heroku DATABASE_URL environment variable
  ssl: {
    rejectUnauthorized: false, // Disable SSL verification for development
  },
});



module.exports = db
