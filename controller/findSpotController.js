
const express = require("express");
// const router = express.Router();
const findspots = express.Router();
const {
    getAllFindSpots,
    getOneFindSpot,
    updateOneFindSpot,
    createFindSpot,
    deleteOne
} = require("../queries/findspot");


findspots.get("/", async (req, res) => {
  try {
    const finds = await getAllFindSpots();
    return res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error getting all find-spots!" });
  }
});


// newusers.get("/userdata", async (req, res) => {
//   try {
//     const finds = await getAllSingleUserFindSpots();
//     return res.json(finds);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Error getting all find-spots!" });
//   }
// });

// getAllSingleUserFindSpots

// deleteOne


findspots.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // const { username } = req.body;
  try {
    await deleteOne(id);
    res.status(200).json({ message: 'Findspot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

findspots.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finds = await getOneFindSpot(id);
    res.json(finds);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "That findspot does not exist!" });
  }
});

findspots.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finds = req.body;

    // Call the update function and handle the response
    const updatedFindspot = await updateOneFindSpot(id, finds);
    res.json(updatedFindspot);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot Update Archive Status of specified findspot" });
  }
});


findspots.post("/", async (req, res) => {
  try {
    const finds = req.body;

    const createdfindspot = await createFindSpot(finds);
    res.json(createdfindspot);
} catch (error) {
    console.log(error);
    console.log("Incoming request body:", req.body);
    res.status(400).json({ error: "Incorrect post body" });

}
});

module.exports = findspots
