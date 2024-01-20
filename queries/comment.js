const db = require("../db/dbConfig");
// var session = require('express-session');

const getAllcomments = async () => await db.any("SELECT * FROM comments");



const deleteOne = async (id) => {
  try {
    await db.none("DELETE FROM comments WHERE id=$1", [id]);
  } catch (error) {
    throw new Error(`Error deleting comments: ${error.message}`);
  }
};


// const deleteOne = async (username, id) => {
//   try {
//     await db.none("DELETE FROM comments WHERE id=$1", [username, id]);
//   } catch (error) {
//     throw new Error(`Error deleting comments: ${error.message}`);
//   }
// };

const getOnecomments = async (id) =>
  await db.one("SELECT * FROM comments WHERE id=$1", id);

//   const updateOnecomments = async (id, comments) => {
//     try {
//       const result = await db.oneOrNone(
//         "UPDATE comments SET full_name=$1, latitude=$2, longitude=$3, description=$4, skybrightness=$5, date=$6, username=$7, image_url=$8 WHERE id=$9 RETURNING *",
//         [
//           comments.full_name,
//           comments.latitude,
//           comments.longitude,
//           comments.description,
//           comments.skybrightness,
//           comments.date,
//           comments.username,
//           comments.image_url,
//           id // id from the function parameter
//         ]
//       );
//       return result; // Return the updated record if successful
//     } catch (error) {
//       throw new Error(`Error updating comments: ${error.message}`);
//     }
//   };
  
const createcomments = async (comments) => {
  try {
    // Checks if the username exists in the 'comments' table
    // const existingUser = await db.oneOrNone(
    //   "SELECT * FROM comments WHERE username = $1", [comments.username]
    // );

    // // If the username already exists, handle the case (for example, return an error)
    // if (existingUser) {
    //   throw new Error('Username already exists in the comments table');
    // }

    // If the username doesn't exist, proceed with the insertion
    const postDate = new Date(); // Get the current date
    // Insert values into the 'comments' table
    const newcomments = await db.one(
      "INSERT INTO comments (description, date, my_username, findspot_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        comments.description,        
        postDate,
        comments.my_username,
        comments.findspot_id,
      ]
    );

    return newcomments;
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
  getAllcomments,
  getOnecomments,
//   updateOnecomments,
  createcomments,
  deleteOne
}
