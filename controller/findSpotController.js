
const express = require("express");
// const router = express.Router();
const findspots = express.Router();
const {
    getAllFindSpots,
    getOneFindSpot,
    updateOneFindSpot,
    createFindSpot,
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

findspots.put("/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const finds = req.body;

    const updatedfindspot = await updateOneFindSpot(id, finds);
    res.json(updatedfindspot);
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
