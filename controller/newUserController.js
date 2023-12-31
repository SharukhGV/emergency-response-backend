const express = require("express");
const newusers = express.Router();
const db = require("../db/dbConfig");
const bcrypt = require('bcrypt');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// Use cookie parser and session middleware

app.use(cookieParser());

app.use(session({
  // Options for session management
  secret: process.env.TOKEN_SECRET, // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }, // Consider setting secure for HTTPS
}));


// // Your other middleware and route handlers...
// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


// jwtMiddleware.js
const jwt = require('jsonwebtoken');
// const jwtMiddleware = require('./jwtMiddleware');
function generateAccessToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: '15m' }); // Adjust expiration as needed
}

const {
    newuser,
    getAllSingleUser,
} = require("../queries/newUser");

newusers.post("/login", async (req, res) => {
    try {
      const hashed_password = req.body.hashed_password;
      const username = req.body.username;

      // Validate inputs (example)
      if (!username || !hashed_password) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
  
      const user = await getAllSingleUser(username);
  
      const isMatch = await bcrypt.compare(`${req.body.hashed_password}`, `${user[0].hashed_password}`);
  
      if (isMatch) {
        const userInfo = {
          userId: user[0].id,
          username: user[0].username,
        };
  
        // req.session.user = userInfo;
  
        const accessToken = generateAccessToken(userInfo);
  
        return res.json({ accessToken });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


newusers.post("/", async (req, res) => {
    try {
        //   const { username, hashed_password } = req.body; // Extract specific fields
        const password = req.body.hashed_password
        const username = req.body.username
        // Validate input (e.g., check for empty fields, password strength)
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid user data" });
        }

        // Check for exact username match using a prepared statement
        const existingUser = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        // Check if existingUser.rows is defined and is an array
        if (Array.isArray(existingUser.rows) && existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }


        // Hash password securely using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user object
        const newUser7 = { username: username, hashed_password: hashedPassword };

        // Insert the user into the database
        newuser(newUser7)
        // Set session data (if applicable)
        // ...

        return res.json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
});



// Handle user logout
newusers.post('/logout', (req, res) => {
    // Perform logout actions (e.g., blacklist the token)
    res.clearCookie('access_token'); // Clear the access token cookie
    res.sendStatus(204); // No Content
});

// Example route to retrieve user data based on the session
newusers.get('/profile', (req, res) => {
    if (req.session.user) {
        const userData = req.session.user;
        res.send(`User ID: ${userData.id}, Username: ${userData.username}`);
    } else {
        res.send('Not logged in');
    }
});



module.exports = newusers
// generateAccessToken, authenticateToken