
const express = require("express");
// const router = express.Router();
const comments = express.Router();
const {
    getAllcomments,
    getOnecomments,
    // updateOnecomments,
    createcomments,
    deleteOne
} = require("../queries/comment");


// HELPER FUNCTIONS START
const isValidId = (id) => {
  const idAsNum = Number(id);
  return Number.isInteger(idAsNum) && idAsNum > 0;
};


const arrayofOBJValues = ["description", "date", "my_username", "userpost_id"];
const isValidUserComments = (post) => {
  // must have all the comments Fields
  for (let field of arrayofOBJValues) {
    if (!post.hasOwnProperty(field)) {
      return false;
    }
  }

  // should not have extra fields
  for (let field in post) {
    if (!arrayofOBJValues.includes(field)) {
      return false;
    }
  }
  // we got this far! All good!
  return true;
};

// HELPER FUNCTIONS END

comments.get("/", async (req, res) => {
  try {
    const userComment = await getAllcomments();
    return  res.json(userComment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error getting all comments!" });
  }
});



comments.delete("/:id", async (req, res) => {
  try {  
    const { id } = req.params;
    if(!isValidId(id)) return  res.status(400).json({error: `id must be positive integer! Received ${id}`})

    await deleteOne(id);
    res.status(200).json({ message: 'comments deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

comments.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if(!isValidId(id)) return  res.status(400).json({error: `id must be positive integer! Received ${id}`})

    const userComment = await getOnecomments(id);
    res.json(userComment);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "That comments does not exist!" });
  }
});


comments.post("/", async (req, res) => {
  try {
    const userComment = req.body;

      if (!isValidUserComments(userComment)) {
        return  res.status(400).json({
          error: `User comment must only have fields: ${arrayofOBJValues.join(", ")}`,
        });
      }
   
    const createdcomments = await createcomments(userComment);
    res.json(createdcomments);
} catch (error) {
    console.log(error);
    console.log("Incoming request body:", req.body);
    res.status(400).json({ error: "Incorrect post body" });

}
});

module.exports = comments
