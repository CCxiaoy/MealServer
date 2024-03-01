require('dotenv').config(); // Import dotenv to read .env file

// db.js
require('dotenv').config(); // Import dotenv to read .env file
const mysql = require('mysql');

const dbConfig = {
    user: process.env.dbUserName, // Change to your MySQL username
    password: process.env.dbPassword, // Change to your MySQL password
    host: process.env.dbHost, // Change to your MySQL host
    database: process.env.dbName, // Change to your database name
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Get a connection from the pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database using connection pooling!');
        // Perform database operations here
        // ...
        // Release the connection when done
        connection.release();
    }
});

// Handle errors and release the pool gracefully
pool.on('error', (err) => {
    console.error('MySQL pool error:', err);
    // Optionally, handle the error or restart the pool
});

module.exports = pool;
