// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db'); // Import your MySQL connection
app.use(bodyParser.json()); // for parsing application/json

const tableName = process.env.tableName;

// Define a route to get all meal items
app.get('/api/allMealLists', (req, res) => {
    const queryString = `SELECT * FROM ${tableName}`;
    db.query(queryString, (err, rows) => {
        if (err) {
            console.error('Error fetching all meal items:', err);
            res.status(500).json({ error: 'Internal server error, Error fetching all meal items' + err });
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
            res.status(500).json({ error: 'Internal server error, Error fetching breakfast items' + err });
        } else {
            res.json({breakfast: rows});
        }
    });
});

// Define a route to get lunch meal items
app.get('/api/lunchList', (req, res) => {
    const queryString = `SELECT * FROM ${tableName} WHERE category = ?`;
    db.query(queryString, ['lunch'], (err, rows) => {
        if (err) {
            console.error('Error fetching lunch items:', err);
            res.status(500).json({ error: 'Internal server error, Error fetching lunch items' + err });
        } else {
            res.json({lunch: rows});
        }
    });
});

// Define a route to get dinner meal items
app.get('/api/dinnerList', (req, res) => {
    const queryString = `SELECT * FROM ${tableName} WHERE category = ?`;
    db.query(queryString, ['dinner'], (err, rows) => {
        if (err) {
            // console.error('Error fetching dinner items:', err);
            console.log('Error fetching dinner items:', err);
            res.status(500).json({ error: 'Internal server error, Error fetching dinner items' + err });
        } else {
            res.json({dinner: rows});
        }
    });
});

// Define a route to get midnight meal items (夜宵)
app.get('/api/midnightList', (req, res) => {
    const queryString = `SELECT * FROM ${tableName} WHERE category = ?`;
    db.query(queryString, ['midnight'], (err, rows) => {
        if (err) {
            // console.error('Error fetching midnight items:', err);
            console.log('Error fetching midnight items:', err);
            res.status(500).json({ error: 'Internal server error, Error fetching midnight items' + err });
        } else {
            res.json({midnight: rows});
        }
    });
});

// Define a route to add a new meal item
app.post('/api/addMealItem', (req, res) => {
    const { name, category } = req.body;
    console.log('name:', name);
    console.log('category:', category);
    const queryString = `INSERT INTO ${tableName} (name, category) VALUES (?, ?)`;
    db.query(queryString, [name, category], (err, result) => {
        if (err) {
            // console.error('Error adding meal item:', err);
            console.log('Error adding meal item:', err);
            res.status(500).json({ error: 'Error adding meal item, Error adding meal item' + err });
        } else {
            res.json({ message: 'Added meal item' });
        }
    });
});

// Define a route to delete a meal item
app.delete('/api/deleteMealItem/:id', (req, res) => {
    const queryString = `DELETE FROM ${tableName} WHERE id = ?`;
    db.query(queryString, [req.params.id], (err, result) => {
        if (err) {
            // console.error('Error deleting meal item:', err);
            console.log('Error deleting meal item:', err);
            res.status(500).json({ error: 'Error deleting meal item, Error deleting meal item' + err });
        } else {
            res.json({ message: 'Deleted meal item' });
        }
    });
});

// Define a route to modify a meal item
app.put('/api/modifyMealItem/:id', (req, res) => {
    const { name, category } = req.body;
    const queryString = `UPDATE ${tableName} SET name = ?, category = ? WHERE id = ?`;
    db.query(queryString, [name, category, req.params.id], (err, result) => {
        if (err) {
            // console.error('Error modifying meal item:', err);
            console.log('Error modifying meal item:', err);
            res.status(500).json({ error: 'Error modifying meal item' });
        } else {
            res.json({ message: 'Modified meal item' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
