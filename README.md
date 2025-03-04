## This is the Backend Documentation for the Zero-Knowledge Proof Online Authentication System using ExpressJS

## 🚀 Backend (Express.js)
The backend handles user registration, challenge generation, and proof verification.

## 📁 server.js

## 📌 Setup Backend Project
Setting up the Express.js backend involves installing dependencies, writing the server code, and running the server. Follow these steps:

## 1. Installing Node.js and npm
If you haven't already, install Node.js and npm from nodejs.org

or by running the following command in your terminal on your local machine
```sh
mkdir zkp-auth-backend
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
