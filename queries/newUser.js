
const db = require("../db/dbConfig");
const newuser = async (userInfo) => {

  const insertNewUser = await db.one(
    "INSERT INTO users (createdAt, username, hashed_password) VALUES($1, $2, $3) RETURNING *",
    [
      Date.now(),
      userInfo.username,
      userInfo.hashed_password,
    ]
  );

  return insertNewUser;
};



const getAllSingleUser = async (username) => {
  const userz = await db.any("SELECT id, username, hashed_password FROM users WHERE username=$1", username);

  return userz
}

const updateUserPassword = async (username, newHashedPassword) => {
  const updatedUser = await db.one(
    "UPDATE users SET hashed_password = $1 WHERE username = $2 RETURNING *",
    [newHashedPassword, username]
  );
  return updatedUser;
};


module.exports = {
  newuser,
  getAllSingleUser,
  updateUserPassword
};

