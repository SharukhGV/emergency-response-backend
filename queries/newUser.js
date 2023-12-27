const db = require("../db/dbConfig");

const newUser = async (userInfo) => {
    // const postDate = new Date(); // This will Generate the current date on the server
  
    const insertNewUser = await db.one(
      "INSERT INTO users (username, hashed_password) VALUES($1, $2) RETURNING *",
      [
        userInfo.username,
        userInfo.hashed_password,
      ]
    );
  
    return insertNewUser;
  }
  const getOneUser = async (user) => {
    const result = await db.one("SELECT * FROM users WHERE username=$1 AND hashed_password=$2", user);
    return result;
  };
  
  const getAllSingleUserFindSpots = async (username) => await db.any("SELECT * FROM findspot WHERE username=$1", username);


  module.exports = {

    newUser,
    getOneUser,
    getAllSingleUserFindSpots
  }
  