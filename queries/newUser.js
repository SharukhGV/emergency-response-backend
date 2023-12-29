
const db = require("../db/dbConfig");
const newuser = async (userInfo) => {
    try {
      const insertNewUser = await db.one(
        "INSERT INTO users (createdAt, username, hashed_password) VALUES($1, $2, $3) RETURNING *",
        [
          Date.now(),
          userInfo.username,
          userInfo.hashed_password,
        ]
      );
    
      return insertNewUser;
    } catch (error) {
      // Handle any errors that might occur during the insertion process
      throw new Error("Error creating a new user: " + error.message);
    }
  };



const getAllSingleUser = async (username) => {
  try {
    const userz = await db.any("SELECT * FROM users WHERE username=$1", username);
    return userz;
  } catch (error) {
    // Handle errors for fetching all find spots for a user
    throw new Error("Error fetching information for a user: " + error.message);
  }
};

module.exports = {
    newuser,
  getAllSingleUser
};

  