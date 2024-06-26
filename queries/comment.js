const db = require("../db/dbConfig");
const getAllcomments = async () => await db.any("SELECT * FROM comments");



const deleteOne = async (id) => {

  await db.none("DELETE FROM comments WHERE id=$1", [id]);

};



const getOnecomments = async (id) =>
  await db.one("SELECT * FROM comments WHERE id=$1", id);


const createcomments = async (comments) => {

  const postDate = new Date();

  const newcomments = await db.one(
    "INSERT INTO comments (description, date, my_username, userpost_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      comments.description,
      postDate,
      comments.my_username,
      comments.userpost_id,
    ]
  );

  return newcomments;

};




module.exports = {
  getAllcomments,
  getOnecomments,
  createcomments,
  deleteOne
}
