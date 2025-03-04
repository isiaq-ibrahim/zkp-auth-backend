

🚀 Backend (Express.js)
📁 server.js

🛠️ How it Works
Registration
1. Stores only username and y = g^x mod p.
2. Authentication
3. Receives commitment (t) from the user.
4. Sends back a random challenge (c).
5. Receives response (r) from the user.
6. Verifies proof: g^r * y^c ≡ t (mod p).






🔐 Key Features
✅ Password is never sent or stored on the server.
✅ Uses Fiat-Shamir ZKP to authenticate securely.
✅ Prevents replay and brute-force attacks.
