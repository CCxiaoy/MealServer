// app.js
const express = require('express');
const app = express();
const db = require('./db'); // Import your MySQL connection

const tableName = process.env.tableName;

// Define a route to get all meal items
app.get('/api/allMealLists', (req, res) => {
    const queryString = `SELECT * FROM ${tableName}`;
    db.query(queryString, (err, rows) => {
        if (err) {
            console.error('Error fetching meal items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define a route to get breakfast meal items
app.get('/api/breakfastList', (req, res) => {
    const queryString = `SELECT * FROM ${tableName} WHERE category = ?`;
    db.query(queryString, ['breakfast'], (err, rows) => {
        if (err) {
            console.error('Error fetching breakfast items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define a route to get lunch meal items
app.get('/api/lunchList', (req, res) => {
    const queryString = `SELECT * FROM ${tableName} WHERE category = ?`;
    db.query(queryString, ['lunch'], (err, rows) => {
        if (err) {
            console.error('Error fetching lunch items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define a route to get dinner meal items
app.get('/api/dinnerList', (req, res) => {
    const queryString = `SELECT * FROM ${tableName} WHERE category = ?`;
    db.query(queryString, ['dinner'], (err, rows) => {
        if (err) {
            console.error('Error fetching dinner items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define a route to add a new meal item
app.post('/api/addMealItem', (req, res) => {
    const { name, category } = req.body;
    const queryString = `INSERT INTO ${tableName} (name, category) VALUES (?, ?)`;
    db.query(queryString, [name, category], (err, result) => {
        if (err) {
            console.error('Error adding meal item:', err);
            res.status(500).json({ error: 'Error adding meal item' });
        } else {
            res.json({ message: 'Added meal item' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
