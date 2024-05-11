const db = require("../db/dbConfig");

const getAlluserposts = async () => await db.any("SELECT * FROM userpost");



const deleteOne = async (id) => {
  
    await db.none("DELETE FROM userpost WHERE id=$1", [id]);
  
};


const getOneuserpost = async (id) =>
  await db.one("SELECT * FROM userpost WHERE id=$1", id);

  const updateOneuserpost = async (id, userpost) => {
    const postDate = new Date(); 

      const result = await db.oneOrNone(
        "UPDATE userpost SET full_name=$1, latitude=$2, longitude=$3, description=$4, skybrightness=$5, date=$6, username=$7, image_url=$8 WHERE id=$9 RETURNING *",
        [
          userpost.full_name,
          userpost.latitude,
          userpost.longitude,
          userpost.description,
          userpost.skybrightness,
          postDate,
          userpost.username,
          userpost.image_url,
          id 
        ]
      );
      return result; 
   
  };
  
const createuserpost = async (userpost) => {
  
   
    const postDate = new Date(); 

    const newuserpost = await db.one(
      "INSERT INTO userpost (full_name, latitude, longitude, description, skybrightness, date, username, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        userpost.full_name,
        userpost.latitude,
        userpost.longitude,
        userpost.description,
        userpost.skybrightness,
        postDate,
        userpost.username,
        userpost.image_url
      ]
    );

    return newuserpost;

};




module.exports = {
  getAlluserposts,
  getOneuserpost,
  updateOneuserpost,
  createuserpost,
  deleteOne
}
