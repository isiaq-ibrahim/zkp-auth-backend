## This is the documentation for the Zero-Knowledge Proof Online Authentication System using ExpressJS

## 🚀 Backend (Express.js)
The backend handles user registration, challenge generation, and proof verification.

## 📁 server.js

## 📌 Setup Backend Project
Setting up the Express.js backend involves installing dependencies, writing the server code, and running the server. Follow these steps:

## 1. Install Node.js and npm
If you haven't already, install Node.js and npm from nodejs.org

or by running the following command in your terminal on your local machine

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
