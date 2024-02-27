require('dotenv').config(); // Import dotenv to read .env file

// db.js
const mysql = require('mysql');

const dbConfig = {
    user: process.env.dbUserName, // Change to your MySQL username
    password: process.env.dbPassword, // Change to your MySQL password
    host: process.env.dbHost, // Change to your MySQL host
    database: process.env.dbName, // Change to your database name
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database!');
    }
});

// connection will be disconnected by mysql after 8 hours of inactivity, so we need to keep it alive
setInterval(() => {
    connection.query('SELECT 1'); // This will send a keep-alive query to MySQL
}, 4*60*60*1000); // 4 hours in milliseconds

module.exports = connection;