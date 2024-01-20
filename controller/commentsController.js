
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


comments.get("/", async (req, res) => {
  try {
    const finds = await getAllcomments();
    return res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error getting all comments!" });
  }
});


// newusers.get("/userdata", async (req, res) => {
//   try {
//     const finds = await getAllSingleUsercommentss();
//     return res.json(finds);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Error getting all find-spots!" });
//   }
// });

// getAllSingleUsercommentss

// deleteOne


comments.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // const { username } = req.body;
  try {
    await deleteOne(id);
    res.status(200).json({ message: 'comments deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

comments.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finds = await getOnecomments(id);
    res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "That comments does not exist!" });
  }
});

// comments.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const finds = req.body;

//     // Call the update function and handle the response
//     const updatedcomments = await updateOnecomments(id, finds);
//     res.json(updatedcomments);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Cannot Update Archive Status of specified comments" });
//   }
// });


comments.post("/", async (req, res) => {
  try {
    const finds = req.body;

    const createdcomments = await createcomments(finds);
    res.json(createdcomments);
} catch (error) {
    console.log(error);
    console.log("Incoming request body:", req.body);
    res.status(400).json({ error: "Incorrect post body" });

}
});

module.exports = comments
