const express = require("express");
const newusers = express.Router();
const db = require("../db/dbConfig");
const bcrypt = require('bcrypt');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
}));



// HELPER FUNCTIONS START

const arrayofOBJValues = ["username", "hashed_password"];

const isValidUserObjectBody = (post) => {
  // must have all the New User Fields
  for (let field of arrayofOBJValues) {
    if (!post.hasOwnProperty(field)) {
      return false;
    }
  }

  // should not have extra fields
  for (let field in post) {
    if (!arrayofOBJValues.includes(field)) {
      return false;
    }
  }
  return true;
};

// HELPER FUNCTIONS END

// jwtMiddleware.js
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: '15m' }); // Adjust expiration as needed
}

const {
  newuser,
  getAllSingleUser,
} = require("../queries/newUser");

// HANDLE LOGGING IN A USER
newusers.post("/login", async (req, res) => {
  try {
    const hashed_password = req.body.hashed_password;
    const username = req.body.username;
    if (!isValidUserObjectBody(req.body)) {
      return res.status(400).json({
        error: `New Users must only have fields: ${arrayofOBJValues.join(", ")}`,
      });}
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

      const accessToken = generateAccessToken(userInfo);

      return res.json({ accessToken });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// HANDLE CREATING NEW USER
newusers.post("/", async (req, res) => {
  try {
    const password = req.body.hashed_password
    const username = req.body.username
    if (!username || !password) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    // const existingUser = await db.query(
    //   "SELECT * FROM users WHERE username = $1",
    //   [username]
    // );
    // if (Array.isArray(existingUser.rows) && existingUser.rows.length > 0) {
    //   return res.status(400).json({ error: "Username already exists" });
    // }
    const user = await getAllSingleUser(username);
    if(!!user){return res.status(400).json({ error: "Username already exists" });
    }
    else{
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser7 = { username: username, hashed_password: hashedPassword };

    newuser(newUser7)

    // return response.json({ message: "User created successfully!" });
    return res.json({ message: "User created successfully!" });}
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});



// HANDLE LOGGING OUT USER
newusers.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.sendStatus(204);
});

// HANDLE GETTING USER INFORMATION (ID AND USERNAME)
newusers.get('/profile', (req, res) => {
  if (req.session.user) {
    const userData = req.session.user;
    res.send(`User ID: ${userData.id}, Username: ${userData.username}`);
  } else {
    res.send('Not logged in');
  }
});



module.exports = newusers
