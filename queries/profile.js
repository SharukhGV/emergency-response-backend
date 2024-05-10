const db = require("../db/dbConfig");

const getAllprofiles = async () => await db.any("SELECT * FROM profile");




const getOneprofile = async (id) => await db.one("SELECT * FROM profile WHERE id=$1", id);


const updateOneprofile = async (profile,id) => {
      const result = await db.oneOrNone(
        "UPDATE profile SET image_url=$1, about=$2, occupation=$3 WHERE id=$4 RETURNING *",
        [
          profile.image_url,
          profile.about,
          profile.occupation,
          id          
        ]
      );
  
        return result; 
   
  };
  
const createprofile = async (profile) => {
   
    const postDate = new Date(); 

    const newprofile = await db.one(
      "INSERT INTO profile (image_url, about, occupation, my_username, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        profile.image_url,
        profile.about,
        profile.occupation,
        profile.my_username,
        postDate
      ]
    );

    return newprofile;
  
};



module.exports = {
  getAllprofiles,
  getOneprofile,
  updateOneprofile,
  createprofile,
//   deleteOne
}
