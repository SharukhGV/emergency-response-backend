const pgp = require("pg-promise")();
require("dotenv").config();

let db;

if (process.env.DATABASE_URL) {
  //FOR production on Render
  db = pgp(process.env.DATABASE_URL);
} else {
  // For local development
  const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    max: 30,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  };
  
  db = pgp(cn);
}

console.log("Database connection established");

module.exports = db;