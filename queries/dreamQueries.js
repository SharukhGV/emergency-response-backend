const db = require("../db/dbConfig");

const getAllDreams = async () => await db.any("SELECT * FROM dreams");

const getDreamById = async (id) => await db.oneOrNone("SELECT * FROM dreams WHERE id=$1", [id]);

const getDreamsByUsername = async (username) => await db.any("SELECT * FROM dreams WHERE username=$1", [username]);

const createDream = async (dream) => {
  const { title, description, date, isDayDream, username } = dream;
  return await db.one(
    "INSERT INTO dreams (title, description, date, isDayDream, createdAt, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, description, date, isDayDream, Date.now(), username]
  );
};

const updateDream = async (id, dream) => {
  const { title, description, date, isDayDream } = dream;
  return await db.oneOrNone(
    "UPDATE dreams SET title=$1, description=$2, date=$3, isDayDream=$4 WHERE id=$5 RETURNING *",
    [title, description, date, isDayDream, id]
  );
};

const deleteOne = async (id) => {
  await db.oneOrNone("DELETE FROM dreams WHERE id=$1", [id]);
};

module.exports = {
  getAllDreams,
  getDreamById,
  getDreamsByUsername,
  createDream,
  updateDream,
  deleteOne
};