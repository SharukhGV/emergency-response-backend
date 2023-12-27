
const express = require("express");
// const router = express.Router();
const findspots = express.Router();
const {
    getAllFindSpots,
    getOneFindSpot,
    updateOneFindSpot,
    createFindSpot,
} = require("../queries/findspot");

// const Iron = require('@hapi/iron');
// const { MAX_AGE, setTokenCookie, getTokenCookie } = require('./auth-cookies');

// const TOKEN_SECRET = process.env.TOKEN_SECRET

//  async function setLoginSession(res, session) {
//   const createdAt = Date.now()
//   // Create a session object with a max age that we can validate later
//   const obj = { ...session, createdAt, maxAge: MAX_AGE }
//   const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

//   setTokenCookie(res, token)
// }

// function validatePassword(user, inputPassword) {
//   const inputHash = crypto
//     .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
//     .toString('hex')
//   const passwordsMatch = user.hash === inputHash


//   if (passwordsMatch) {
//     // Passwords match, proceed to the next middleware or route handler
//     next();
//   } else {
//     // Passwords do not match, handle authentication failure
//     res.status(401).send('Authentication failed');
  
// }}





// function createUser({ username, password }) {
//   // Here you should create the user and save the salt and hashed password (some dbs may have
//   // authentication methods that will do it for you so you don't have to worry about it):
//   const hash = crypto.randomBytes(16).toString('hex').pbkdf2Sync(password, hash, 1000, 64, 'sha512')
//     .toString('hex')
    
//   const user = {
//     id: uuidv4(),
//     createdAt: Date.now(),
//     username,
//     hash,
//     // salt,
//   };

//   return {username:user.username, hashed_password:user.hash}

// }
// const authMiddleware = (req, res, next) => {
//   const token = getTokenCookie(req); // Retrieve token from cookie

//   if (token) {
//     try {
//       const sessionData = Iron.unseal(token, TOKEN_SECRET, Iron.defaults); // Decrypt and verify token
//       req.session = sessionData; // Attach session data to request object
//       next(); // Proceed to next middleware or route handler
//     } catch (error) {
//       // Handle invalid or expired token
//       res.status(401).json({ error: "Unauthorized" });
//     }
//   } else {
//     // Handle missing token
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// newusers.get("/:user", validatePassword, authMiddleware, async (req, res) => {
//   try {
//     const { user } = req.params;
//     const getUser = await getOneUser(user);
//     res.json(getUser);
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ error: "That User does not exist!" });
//   }
// });

// // ... other routes



findspots.get("/", async (req, res) => {
  try {
    const finds = await getAllFindSpots();
    return res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error getting all find-spots!" });
  }
});


// newusers.get("/userdata", async (req, res) => {
//   try {
//     const finds = await getAllSingleUserFindSpots();
//     return res.json(finds);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Error getting all find-spots!" });
//   }
// });

// getAllSingleUserFindSpots

findspots.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finds = await getOneFindSpot(id);
    res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "That findspot does not exist!" });
  }
});

findspots.put("/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const finds = req.body;

    const updatedfindspot = await updateOneFindSpot(id, finds);
    res.json(updatedfindspot);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot Update Archive Status of specified findspot" });
  }
});


findspots.post("/", async (req, res) => {
  try {
    const finds = req.body;

    const createdfindspot = await createFindSpot(finds);
    res.json(createdfindspot);
} catch (error) {
    console.log(error);
    console.log("Incoming request body:", req.body);
    res.status(400).json({ error: "Incorrect post body" });

}
});

module.exports = findspots
