
const express = require("express");
const userposts = express.Router();
const {
  getAlluserposts,
  getOneuserpost,
  updateOneuserpost,
  createuserpost,
  deleteOne,
} = require("../queries/userpost");


// HELPER FUNCTIONS START
const isValidId = (id) => {
  const idAsNum = Number(id);
  return Number.isInteger(idAsNum) && idAsNum > 0;
};
const arrayofOBJValues = ["full_name", "latitude", "longitude", "description", "skybrightness", "image_url", "username"];
const arrayofOBJValuesPUT = ["full_name", "latitude", "longitude", "description", "skybrightness", "image_url", "username"];

const isValidUserPost = (post) => {
  for (let field of arrayofOBJValues) {
    if (!post.hasOwnProperty(field)) {
      return false;
    }
  }

  for (let field in post) {
    if (!arrayofOBJValues.includes(field)) {
      return false;
    }
  }
  return true;
};

const isValidUserPostPUT = (post) => {
  for (let field of arrayofOBJValuesPUT) {
    if (!post.hasOwnProperty(field)) {
      return false;
    }
  }

  for (let field in post) {
    if (!arrayofOBJValuesPUT.includes(field)) {
      return false;
    }
  }
  return true;
};


// HELPER FUNCTIONS END

// READ ALL USER POSTS
userposts.get("/", async (req, res) => {
  try {
    const posts = await getAlluserposts();

    return res.status(200).json({ data: posts })


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE SPECIFIC USER POST
userposts.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) return res.status(400).json({ error: `id must be positive integer! Received ${id}` })




    const deletedPost = await deleteOne(id);


    return res.status(200).json({ data: deletedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// READ SPECIFIC USER POST
userposts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: `id must be positive integer! Received ${id}` })

    const post = await getOneuserpost(id);
    return res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// UPDATE/EDIT SPECIFIC USER POST
userposts.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userPost = req.body;

    if (!isValidId(id)) return res.status(400).json({ error: `id must be positive integer! Received ${id}` })

    if (!isValidUserPostPUT(userPost)) {
      return res.status(400).json({
        error: `User Posts must only have fields: ${arrayofOBJValuesPUT.join(", ")} received ${userPost}`,
      });
    }


    const updateduserpost = await updateOneuserpost(id, userPost);
    return res.status(200).json({ data: updateduserpost });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE USER POST FROM A USER
userposts.post("/", async (req, res) => {
  try {
    const userPost = req.body;

    if (!isValidUserPost(userPost)) {
      return res.status(400).json({
        error: `User Posts must only have fields: ${arrayofOBJValues.join(", ")}`,
      });
    }
    // 

    const createduserpost = await createuserpost(userPost);
    return res.status(201).json({ data: createduserpost });
  } catch (error) {

    return res.status(500).json({ error: "Internal Server Error" });

  }
});


module.exports = userposts
