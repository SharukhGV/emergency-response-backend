
const express = require("express");
const profiles = express.Router();
const {
    getAllprofiles,
    getOneprofile,
    updateOneprofile,
    createprofile,
    // deleteOne
} = require("../queries/profile");

// HELPER FUNCTIONS START
const isValidId = (id) => {
  const idAsNum = Number(id);
  return Number.isInteger(idAsNum) && idAsNum > 0;
};

const arrayofOBJValues = ["image_url", "about", "occupation", "date", "my_username"];
const isValidUserProfile = (post) => {
  // must have all the Profile Fields
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
profiles.get("/", async (req, res) => {
  try {
    const userprofile = await getAllprofiles();
    return  res.status(200).json({ data: userprofile });



  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


profiles.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if(!isValidId(id)) return  res.status(400).json({error: `id must be positive integer! Received ${id}`})

    const userprofile = await getOneprofile(id);
     res.status(200).json({ data: userprofile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

profiles.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userprofile = req.body;

    if(!isValidId(id)) return  res.status(400).json({error: `id must be positive integer! Received ${id}`})

    if (!isValidUserProfile(userprofile)) {
      return  res.status(400).json({
        error: `User Profile must only have fields: ${arrayofOBJValues.join(", ")}`,
      });
    }
   
    const updatedprofile = await updateOneprofile(userprofile, id);
    return  res.status(200).json({ data: updatedprofile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


profiles.post("/", async (req, res) => {
  try {
    const userprofile = req.body;

      if (!isValidUserProfile(userprofile)) {
        return  res.status(400).json({
          error: `User Profile must only have fields: ${arrayofOBJValues.join(", ")}`,
        });
      }
     
    const createdprofile = await createprofile(userprofile);
    return  res.status(201).json({ data: createdprofile });

} catch (error) {

    res.status(500).json({ error: error.message });

}
});

module.exports = profiles
