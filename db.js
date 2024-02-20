// db.js
const mysql = require('mysql');

const dbConfig = {
    host: process.env.dbHost, // Change to your MySQL host
    user: process.env.dbUserName, // Change to your MySQL username
    password: process.env.dbPassword, // Change to your MySQL password
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

module.exports = connection;