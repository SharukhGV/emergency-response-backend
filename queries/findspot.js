const db = require("../db/dbConfig");
// var session = require('express-session');

const getAllFindSpots = async () => await db.any("SELECT * FROM findspot");
// const getAllSingleUserFindSpots = async (username) => await db.any("SELECT * FROM findspot WHERE username=$1", username);


const getOneFindSpot = async (id) =>
  await db.one("SELECT * FROM findspot WHERE id=$1", id);

const updateOneFindSpot = async (id, findspot) => {
  const { archived } = findspot;

  return await db.one(
    "UPDATE findspot SET archived=$1 WHERE id=$2 RETURNING *",
    [archived, id]
  );
};
const createFindSpot = async (findspot) => {
  try {
    // Checks if the username exists in the 'findspot' table
    // const existingUser = await db.oneOrNone(
    //   "SELECT * FROM findspot WHERE username = $1", [findspot.username]
    // );

    // // If the username already exists, handle the case (for example, return an error)
    // if (existingUser) {
    //   throw new Error('Username already exists in the findspot table');
    // }

    // If the username doesn't exist, proceed with the insertion
    const postDate = new Date(); // Get the current date

    // Insert values into the 'findspot' table
    const newFindSpot = await db.one(
      "INSERT INTO findspot (full_name, latitude, longitude, description, skybrightness, date, username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        findspot.full_name,
        findspot.latitude,
        findspot.longitude,
        findspot.description,
        findspot.skybrightness,
        postDate,
        findspot.username
      ]
    );

    return newFindSpot;
  } catch (error) {
    throw new Error('Error creating a new find spot: ' + error.message);
  }
};

// const newUser = async (userInfo) => {
//   // const postDate = new Date(); // This will Generate the current date on the server

//   const insertNewUser = await db.one(
//     "INSERT INTO users (username, hashed_password) VALUES($1, $2) RETURNING *",
//     [
//       userInfo.username,
//       userInfo.hashed_password,
//     ]
//   );

//   return insertNewUser;
// }
// const getOneUser = async (user) => {
//   const result = await db.one("SELECT * FROM users WHERE username=$1 AND hashed_password=$2", user);
//   return result;
// };


module.exports = {
  getAllFindSpots,
  getOneFindSpot,
  updateOneFindSpot,
  createFindSpot,

}
