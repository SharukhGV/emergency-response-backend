

const express = require("express");
const newusers = express.Router();
// const { v4: uuidv4 } = require('uuid');
const {
   
    newUser,
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

function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash


  if (passwordsMatch) {
    // Passwords match, proceed to the next middleware or route handler
    next();
  } else {
    // Passwords do not match, handle authentication failure
    res.status(401).send('Authentication failed');
  
}}




// const crypto = require('crypto');

// function createUser({ username, password }) {
//   // Generate a random salt
//   const salt = crypto.randomBytes(16).toString('hex');

//   // Hash the password using PBKDF2 with the generated salt
//   const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

//   const user = {
//     id: uuidv4(),
//     createdAt: Date.now(),
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

const authMiddleware = (req, res, next) => {
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
newusers.get("/:username", validatePassword, authMiddleware, async (req, res) => {
    try {
      // Assuming username is retrieved from the route parameter
      const { username } = req.params;
  
      // Use the username to fetch user information from the database
      const user = await getAllSingleUser(username);
  
      // Assuming user contains the retrieved user information
      const userInfo = {
        userId: user.userId,
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
  

// ... other routes

// Route handler for creating a new user
newusers.post("/", async (req, res) => {
    try {
      const user = req.body; // Assuming the request body contains username and password
      let encryptedUser = createUser(user.username, user.hashed_password)
      // Call the `newUser` function to insert the new user into the database
     await newUser(encryptedUser);
  
      // If user creation is successful, set session data and send a success message
    //   const sessionData = { /* user data */ };
    //   await setLoginSession(res, sessionData);
    return  res.json({ message: "User created and logged in successfully!", encryptedUser });
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Invalid credentials or unable to create user" });
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



module.exports = newusers