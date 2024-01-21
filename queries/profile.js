const db = require("../db/dbConfig");
// var session = require('express-session');

const getAllprofiles = async () => await db.any("SELECT * FROM profile");



// const deleteOne = async (id) => {
//   try {
//     await db.none("DELETE FROM profile WHERE id=$1", [id]);
//   } catch (error) {
//     throw new Error(`Error deleting profile: ${error.message}`);
//   }
// };


// const deleteOne = async (username, id) => {
//   try {
//     await db.none("DELETE FROM profile WHERE id=$1", [username, id]);
//   } catch (error) {
//     throw new Error(`Error deleting profile: ${error.message}`);
//   }
// };

const getOneprofile = async (id) =>
  await db.one("SELECT * FROM profile WHERE id=$1", id);

  const updateOneprofile = async (id, profile) => {
    try {
      const result = await db.oneOrNone(
        "UPDATE profile SET image_url=$1, about=$2, occupation=$3 WHERE id=$4 RETURNING *",
        [
          profile.image_url,
          profile.about,
          profile.occupation,
          id          
        ]
      );
      return result; // Return the updated record if successful
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  };
  
const createprofile = async (profile) => {
  try {
    // Checks if the username exists in the 'profile' table
    // const existingUser = await db.oneOrNone(
    //   "SELECT * FROM profile WHERE username = $1", [profile.username]
    // );

    // // If the username already exists, handle the case (for example, return an error)
    // if (existingUser) {
    //   throw new Error('Username already exists in the profile table');
    // }

    // If the username doesn't exist, proceed with the insertion
    // const postDate = new Date(); // Get the current date

    // Insert values into the 'profile' table
    const newprofile = await db.one(
      "INSERT INTO profile (image_url, about, occupation, my_username) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        profile.image_url,
        profile.about,
        profile.occupation,
        profile.my_username
      ]
    );

    return newprofile;
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
  getAllprofiles,
  getOneprofile,
  updateOneprofile,
  createprofile,
//   deleteOne
}
