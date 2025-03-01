const express = require('express');
const app = express();

app.use(express.json());

let users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(3000, () => {
    console.log('API running at http://localhost:3000/users');
});