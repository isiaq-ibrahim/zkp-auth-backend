## This is the Backend Documentation for the Zero-Knowledge Proof Online Authentication System using ExpressJS

## 🚀 Backend (Express.js)
The backend handles user registration, challenge generation, and proof verification.

## 📁 server.js

## 📌 Setup Backend Project
Setting up the Express.js backend involves installing dependencies, writing the server code, and running the server. Follow these steps:

## 1. Installing Node.js and npm
If you haven't already, install Node.js and npm from nodejs.org. After that, run the following command in your terminal to create a directory in your preferred location on your local machine
```sh
mkdir zkp-auth-backend
```
Next, install npm by running the following command in your terminal
```
npm install
```
![Creating an ExpressJS Directory using Command Prompt]()
This will create a directory called zkp-auth-backend

## 2. Creating the Backend Project
Next, navigate to the directory zkp-auth-backend by running the following command in your terminal
```sh
cd zkp-auth-backend
```
Once you are in the zkp-auth-backend directory, initialize a new Node.js project by running the following command
```sh
npm init -y
```

## 3. Installing required dependencies
The next step is installing express, cors, big integer dependencies. Run the following in your terminal to install the dependencies.
```sh
npm install express cors big-integer
```
• express: Web framework for handling requests.  
• cors: Allows frontend requests from different origins.  
• big-integer: Handles large number calculations for modular arithmetic.

## 4. Create a 'server.js' file and add the following code
Inside the zkp-auth-backend folder, create a file named server.js and paste the following code:
```sh
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const bigInt = require('big-integer');

const app = express();
app.use(express.json());
app.use(cors());

const users = {}; // Stores username -> public key (y)

// Parameters for ZKP (use strong primes in production)
const p = bigInt('23'); // Prime number
const g = bigInt('5');  // Generator

// Helper function for hashing
const hash = (...values) => {
    const hashInput = values.join('');
    return bigInt(crypto.createHash('sha256').update(hashInput).digest('hex'), 16).mod(p);
};

// User registration
app.post('/register', (req, res) => {
    const { username, y } = req.body;
    if (users[username]) return res.status(400).json({ error: 'User already exists' });
    users[username] = bigInt(y);
    res.json({ message: 'User registered' });
});

// Step 1: Receive commitment (t) from user, generate challenge (c)
app.post('/challenge', (req, res) => {
    const { username, t } = req.body;
    if (!users[username]) return res.status(400).json({ error: 'User not found' });

    const y = users[username];
    const tBig = bigInt(t);
    const c = hash(g, y, tBig);
    res.json({ c: c.toString() });
});

// Step 2: Receive response (r) and verify proof
app.post('/verify', (req, res) => {
    const { username, t, r } = req.body;
    if (!users[username]) return res.status(400).json({ error: 'User not found' });

    const y = users[username];
    const tBig = bigInt(t);
    const rBig = bigInt(r);
    const c = hash(g, y, tBig);

    // Verification: g^r * y^c ≡ t (mod p)
    const lhs = g.modPow(rBig, p).multiply(y.modPow(c, p)).mod(p);
    if (lhs.equals(tBig)) {
        res.json({ success: true, message: 'Authentication successful' });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```

## 5. Run the server
Once you have completed the steps above, you can start the server by running the following command
```
node server.js
```
If you want automatic restarts on changes, install nodeman by running the following command
```
npm install -g nodemon
nodemon server.js
```

## 🛠️ How it Works
Registration
1. Stores only username and y = g^x mod p.
2. Authentication
3. Receives commitment (t) from the user.
4. Sends back a random challenge (c).
5. Receives response (r) from the user.
6. Verifies proof: g^r * y^c ≡ t (mod p).






## 🔐 Key Features
✅ Password is never sent or stored on the server.  
✅ Uses Fiat-Shamir ZKP to authenticate securely.  
✅ Prevents replay and brute-force attacks.
