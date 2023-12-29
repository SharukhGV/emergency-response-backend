const express = require("express");
const newusers = express.Router();
const db = require("../db/dbConfig");
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
// const { v4: uuidv4 } = require('uuid');
const {
    newuser,
    getAllSingleUser,
} = require("../queries/newUser");

// const {
//     setTokenCookie,
//     removeTokenCookie,
//     parseCookies,
//     getTokenCookie
//   } = require("./auth-cookies")
const MAX_AGE = 60 * 60 * 8 // 8 hours

const Iron = require('@hapi/iron');
const { setTokenCookie, getTokenCookie } = require('./auth-cookies');

const TOKEN_SECRET = process.env.TOKEN_SECRET

 async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

// function validatePassword(req, res) {
//     const { username, hashed_password } = req.body; // Assuming these are available in the request object

//     const inputHash = crypto
//       .pbkdf2Sync(inputPassword, username.salt, 1000, 64, 'sha512')
//       .toString('hex');
//     const passwordsMatch = user.hash === hashed_password;
  
//     if (passwordsMatch) {
//       // Passwords match, proceed to the next middleware or route handler
//       next();
//     } else {
//       // Passwords do not match, handle authentication failure
//       res.status(401).send('Authentication failed');
//     }
//   }
  
async function validatePassword(req, res, next) {
    try {
      const { username, hashed_password } = req.body;
  
      // Sanitize and validate input (example)
      // ...
  
      // Retrieve user from database securely using prepared statement
      const user = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
  
      if (!user || !user.rows.length) {
        return res.status(401).send('Invalid username');
      }
  
      const isValidPassword = await bcrypt.compare(hashed_password, user.rows[0].hashed_password);
  
      if (isValidPassword) {
        next(); // Proceed to next middleware/route
      } else {
        res.status(401).send('Authentication failed');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }



// const crypto = require('crypto');

// function createUser({ username, password }) {
//   // Generate a random salt
//   const salt = crypto.randomBytes(16).toString('hex');

//   // Hash the password using PBKDF2 with the generated salt
//   const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

//   const user = {
//     id: uuidv4(),
// \]]]]]]    createdAt: Date.now(),
//     username: username,
//     hashed_Password: hashedPassword, // Store the hashed password
//     salt, // Store the salt
//   };

//   // Return user object with username, hashed password, and salt
//   return user;
// }


const crypto = require('crypto');

// Function to hash and salt the password
function hashPassword(password, salt) {
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hashedPassword;
}

// Function to create a new user (with password hashing)
const createUser = async (username, password ) => {
  try {
    // Generate a random salt
    const salt = crypto.randomBytes(16).toString('hex');

    // Hash the provided password using the generated salt
    const hashedPassword = hashPassword(password, salt);

    // Save 'username', 'hashedPassword', and 'salt' in the database
    // Perform the database insertion operation here using the hashedPassword and salt

    // For demonstration purposes, returning the user object with hashedPassword and salt
    const user = {
        username:username,
        hashed_password:hashedPassword,
        salt:salt,
    };

    return user;
  } catch (error) {
    // Handle errors
    throw new Error("Error creating a new user: " + error.message);
  }
};

// Usage example:
// const newUser = { username: 'exampleUser', password: 'examplePassword' };
// createUser(newUser)
//   .then(user => {
//     console.log("New user created:", user);
//     // Perform database insertion here using user object's data (hashedPassword, salt, etc.)
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });

const authMiddleware = (req, res) => {
  const token = getTokenCookie(req); // Retrieve token from cookie

  if (token) {
    try {
      const sessionData = Iron.unseal(token, TOKEN_SECRET, Iron.defaults); // Decrypt and verify token
      req.session = sessionData; // Attach session data to request object
      next(); // Proceed to next middleware or route handler
    } catch (error) {
      // Handle invalid or expired token
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    // Handle missing token
    res.status(401).json({ error: "Unauthorized" });
  }
};
newusers.post("/:person", async (req, res) => {
    try {
      // Assuming username is retrieved from the route parameter
      const { username, hashed_password } = req.body;
    //   (username,hashed_password)
      const {person} = req.params
      // Use the username to fetch user information from the database
      const user = await getAllSingleUser(person);
    //   const inputPassword = req.body.password;
  
      // Example: Passing user and inputPassword to the validatePassword middleware
      validatePassword(person, hashed_password);
  
      // Example: Using authMiddleware if needed
      authMiddleware(req, res);
  
      // Assuming user contains the retrieved user information
      const userInfo = {
        userId: user.id,
        username: user.username,
        // Other user information...
      };
  
      // Send the user information as a JSON response
      return res.json(userInfo);
  
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "That User does not exist!" });
    }
  });
  
// newusers.get("/userdata", async (req, res) => {
//     try {
//       const finds = await getAllSingleUser();
//       return res.json(finds);
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ error: "Error getting all find-spots!" });
//     }
//   });
// ... other routes

// Route handler for creating a new user

// newusers.post("/", async (req, res) => {
    
//   try { 
//     const user = req.body;
//     // Check if a similar user already exists in the database
//     const existingUser = await db('users').where('username', 'like', `%${user.username}%`).first();

//     if (existingUser) {
//         return res.status(400).json({ error: 'A similar user already exists.' });
//     }

//       // Assuming the request body contains username and password
//       let encryptedUser = createUser(user.username, user.hashed_password)
//       // Call the `newUser` function to insert the new user into the database
// await newUser(encryptedUser);
  
//       // If user creation is successful, set session data and send a success message
//     //   const sessionData = userDATA;
//     //   await setLoginSession(res, sessionData);
//     return  res.json({ message: "User created successfully!", encryptedUser });
//     } catch (error) {
//       console.log(error);
//       res.status(401).json({ error: "Invalid credentials or unable to create user" });
//     }
//   });
// ABOVE CODE IS PREVIOSLY USED

newusers.post("/", async (req, res) => {
    try {
    //   const { username, hashed_password } = req.body; // Extract specific fields
  const password = req.body.hashed_password
  const username = req.body.username
      // Validate input (e.g., check for empty fields, password strength)
      if (!username || !password ) {
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
      const newUser7 = { username:username, hashed_password:hashedPassword };
  
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







// newusers.get("/userdata", async (req, res) => {
//     try {
//       const finds = await getAllSingleUser();
//       return res.json(finds);
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ error: "Error getting all find-spots!" });
//     }
//   });

newusers.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        // Handle error
        res.status(500).json({ error: 'Error logging out' });
      } else {
        // Session destroyed, user logged out
        // res.redirect('/login'); // Redirect to login page or any desired page
      }
    });
  });
  

module.exports = newusers