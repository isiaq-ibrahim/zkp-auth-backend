const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bigInt = require("big-integer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Predefined public parameters
const g = bigInt(5);
const p = bigInt(23);

// Simulated database: storing only usernames and public keys (y = g^x mod p)
const users = {};
const challenges = {};

// User registration: Store (username, y) where y = g^x mod p
app.post("/register", (req, res) => {
    const { username, y } = req.body;

    if (!username || !y) {
        return res.status(400).json({ error: "Username and public key y are required." });
    }

    if (users[username]) {
        return res.status(400).json({ error: "Username already exists." });
    }

    users[username] = { y: bigInt(y) };
    console.log(`User registered: ${username}, y: ${y}`);
    res.json({ success: true, message: "Registration successful!" });
});

// Step 1: Receive commitment t and send challenge c
app.post("/challenge", (req, res) => {
    const { username, t } = req.body;

    if (!users[username]) {
        return res.status(400).json({ error: "User not found." });
    }

    const c = bigInt.randBetween(1, 10); // Generate challenge randomly
    challenges[username] = { c, t: bigInt(t) };

    console.log(`Challenge for ${username}: c = ${c}`);
    res.json({ c: c.toString() });
});

// Step 2: Verify the proof (t, r)
app.post("/verify", (req, res) => {
    const { username, t, r } = req.body;

    if (!users[username] || !challenges[username]) {
        return res.status(400).json({ error: "Invalid authentication session." });
    }

    const { c, t: storedT } = challenges[username];
    const y = users[username].y;

    const left = g.modPow(bigInt(r), p).multiply(y.modPow(bigInt(c), p)).mod(p);
    const right = storedT.mod(p);

    console.log(`Verifying ${username}: Left = ${left}, Right = ${right}`);

    if (left.equals(right)) {
        delete challenges[username]; // Clear challenge after successful login
        return res.json({ success: true, message: "Authentication successful!" });
    } else {
        return res.status(400).json({ success: false, error: "Authentication failed." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
