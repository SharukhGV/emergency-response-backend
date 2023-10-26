const db = require("../db/dbConfig.js");


const getAllFindSpots = async () => await db.any("SELECT * FROM findspot");

const getOneFindSpot = async (id) =>
  await db.one("SELECT * FROM findspot WHERE id=$1", id);



const updateOneFindSpot = async (id, FindSpot) => {
  const { archived } = FindSpot;

  return await db.one(
    "UPDATE findspot SET archived=$1 WHERE id=$2 RETURNING *",
    [archived, id]
  );
};


  const createFindSpot = async (findspot) => {

    const postDate = new Date(); // This will Generate the current date on the server

    const insertedFindSpot = await db.one(
      "INSERT INTO findspot (full_name, latitude, longitude, description, emergency, archived, date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        findspot.full_Name,
        findspot.latitude,
        findspot.longitude,
        findspot.description,
        findspot.emergency,
        findspot.archived,
        postDate
      ]
    );
  
    return insertedFindSpot;
  }




module.exports = {
    getAllFindSpots,
    getOneFindSpot,
    updateOneFindSpot,
    createFindSpot,
};