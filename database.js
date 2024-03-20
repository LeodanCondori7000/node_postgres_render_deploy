require("dotenv").config();
const { Pool } = require("pg");

// Configure the connection parameters for your local PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// const pool = new Pool({
//   user: "postgres", // Replace 'your_username' with your PostgreSQL username
//   host: "localhost", // Assuming your PostgreSQL server is running locally
//   database: "test_db", // Replace 'your_database' with your PostgreSQL database name
//   password: "celestial7000", // Replace 'your_password' with your PostgreSQL password
//   port: 5432, // Default PostgreSQL port
// });

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
  } else {
    console.log("Connected to PostgreSQL successfully!");
  }
});

module.exports = pool;

//
// const { Pool } = require('pg')

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })

// pool.connect((err) => {
//     if (err) throw err
//     console.log("Connect to PostgreSQL successfully!")
// })

// module.exports = pool
