// const db = require("../db/dbConfig");

// const newUser = async (userInfo) => {
//     // const postDate = new Date(); // This will Generate the current date on the server
  
//     const insertNewUser = await db.one(
//       "INSERT INTO users (username, hashed_password) VALUES($1, $2) RETURNING *",
//       [
//         userInfo.username,
//         userInfo.hashed_password,
//       ]
//     );
  
//     return insertNewUser;
//   }
//   const getOneUser = async (user) => {
//     const result = await db.one("SELECT * FROM users WHERE username=$1 AND hashed_password=$2", user);
//     return result;
//   };
  
//   const getAllSingleUserFindSpots = async (username) => await db.any("SELECT * FROM findspot WHERE username=$1", username);


//   module.exports = {

//     newUser,
//     getOneUser,
//     getAllSingleUserFindSpots
//   }

const db = require("../db/dbConfig");
const newUser = async (userInfo) => {
    try {
      const insertNewUser = await db.one(
        "INSERT INTO users (id, createdAt, username, hashed_password, salt) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [
          userInfo.id,
          Date.now(),
          userInfo.username,
          userInfo.hashedpassword,
          userInfo.salt
        ]
      );
    
      return insertNewUser;
    } catch (error) {
      // Handle any errors that might occur during the insertion process
      throw new Error("Error creating a new user: " + error.message);
    }
  };

const getOneUser = async (user) => {
  try {
    const result = await db.one("SELECT * FROM users WHERE username=$1 AND hashed_password=$2", user);
    return result;
  } catch (error) {
    // Handle errors for fetching a single user
    throw new Error("Error fetching a user: " + error.message);
  }
};

const getAllSingleUserFindSpots = async (username) => {
  try {
    const findSpots = await db.any("SELECT * FROM findspot WHERE username=$1", username);
    return findSpots;
  } catch (error) {
    // Handle errors for fetching all find spots for a user
    throw new Error("Error fetching find spots for a user: " + error.message);
  }
};

module.exports = {
  newUser,
  getOneUser,
  getAllSingleUserFindSpots
};

  