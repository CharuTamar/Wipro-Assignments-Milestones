const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Add a new user
app.post("/users", (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.json(newUser);
});

app.listen(5000, () => console.log("Server running on port 5000"));
