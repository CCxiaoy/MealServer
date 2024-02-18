// app.js
const express = require('express');
const app = express();

// Define your breakfast menu
const allMealLists = {
    "breakfast": [
        {"id": 1, "name": "坚果酸奶碗"},
        {"id": 2, "name": "西式煎蛋"},
        {"id": 3, "name": "浆果类小水果"},
    ],
    "lunch": [],
    "dinner": [],
};

// Define a route to handle GET requests for breakfast menu
app.get('/api/allmeallist', (req, res) => {
    res.json(allMealLists);
});

// Start the server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
