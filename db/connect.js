const { Pool } = require('pg');
require('dotenv').config();
console.log("🧠 Using DB:", process.env.DB_NAME); // ✅ This is correct

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // ✅ Fix this line
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL DB"))
  .catch(err => console.error("❌ DB Connection Error", err.stack));

module.exports = pool;

