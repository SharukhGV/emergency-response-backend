
const express = require("express");
// const router = express.Router();
const profiles = express.Router();
const {
    getAllprofiles,
    getOneprofile,
    updateOneprofile,
    createprofile,
    // deleteOne
} = require("../queries/profile");


profiles.get("/", async (req, res) => {
  try {
    const finds = await getAllprofiles();
    return res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error getting all find-spots!" });
  }
});


// newusers.get("/userdata", async (req, res) => {
//   try {
//     const finds = await getAllSingleUserprofiles();
//     return res.json(finds);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Error getting all find-spots!" });
//   }
// });

// getAllSingleUserprofiles

// deleteOne


// profiles.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   // const { username } = req.body;
//   try {
//     await deleteOne(id);
//     res.status(200).json({ message: 'profile deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

profiles.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finds = await getOneprofile(id);
    res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "That profile does not exist!" });
  }
});

profiles.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finds = req.body;

    // Call the update function and handle the response
    const updatedprofile = await updateOneprofile(finds, id);
    res.json(updatedprofile);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot Update Archive Status of specified profile" });
  }
});


profiles.post("/", async (req, res) => {
  try {
    const finds = req.body;

    const createdprofile = await createprofile(finds);
    res.json(createdprofile);
} catch (error) {
    console.log(error);
    console.log("Incoming request body:", req.body);
    res.status(400).json({ error: "Incorrect post body" });

}
});

module.exports = profiles
