// app.js
const express = require('express');
const app = express();
const db = require('./db'); // Import your MySQL connection

// Define a route to get all menu items
app.get('/api/allMealLists', (req, res) => {
    db.query('SELECT * FROM menu_items', (err, rows) => {
        if (err) {
            console.error('Error fetching menu items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define a route to get breakfast menu items
app.get('/api/breakfastList', (req, res) => {
    db.query('SELECT * FROM menu_items WHERE category = ?', ['breakfast'], (err, rows) => {
        if (err) {
            console.error('Error fetching breakfast items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define a route to get lunch menu items
app.get('/api/lunchList', (req, res) => {
    db.query('SELECT * FROM menu_items WHERE category = ?', ['lunch'], (err, rows) => {
        if (err) {
            console.error('Error fetching lunch items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define a route to get dinner menu items
app.get('/api/dinnerList', (req, res) => {
    db.query('SELECT * FROM menu_items WHERE category = ?', ['dinner'], (err, rows) => {
        if (err) {
            console.error('Error fetching dinner items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
