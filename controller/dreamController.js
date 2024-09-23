const express = require("express");
const dreams = express.Router();
const {
  getAllDreams,
  getDreamById,
  getDreamsByUsername,
  createDream,
  updateDream,
  deleteOne
} = require("../queries/dreamQueries");

// HELPER FUNCTIONS START
const isValidId = (id) => {
  const idAsNum = Number(id);
  return Number.isInteger(idAsNum) && idAsNum > 0;
};

const arrayOfObjValues = ["title", "description", "date", "isDayDream", "username"];

const isValidDream = (dream) => {
  for (let field of arrayOfObjValues) {
    if (!dream.hasOwnProperty(field)) {
      return false;
    }
  }

  for (let field in dream) {
    if (!arrayOfObjValues.includes(field)) {
      return false;
    }
  }
  return true;
};

const isValidDreamUpdate = (dream) => {
  const updateFields = ["title", "description", "date", "isDayDream"];
  for (let field of updateFields) {
    if (!dream.hasOwnProperty(field)) {
      return false;
    }
  }

  for (let field in dream) {
    if (!updateFields.includes(field)) {
      return false;
    }
  }
  return true;
};
// HELPER FUNCTIONS END

// READ ALL DREAMS
dreams.get("/", async (req, res) => {
  try {
    const allDreams = await getAllDreams();
    return res.status(200).json({ data: allDreams });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// READ ONE DREAM
dreams.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: `id must be a positive integer! Received ${id}` });

    const dream = await getDreamById(id);
    if (!dream) return res.status(404).json({ error: "Dream not found" });

    return res.status(200).json({ data: dream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ DREAMS BY USERNAME
dreams.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const dreams = await getDreamsByUsername(username);
    return res.status(200).json({ data: dreams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE DREAM
dreams.post("/", async (req, res) => {
  try {
    const dream = req.body;
    if (!isValidDream(dream)) return res.status(400).json({ error: "Invalid dream data" });

    const newDream = await createDream(dream);
    return res.status(201).json({ data: newDream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE DREAM
dreams.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dream = req.body;

    if (!isValidId(id)) return res.status(400).json({ error: `id must be a positive integer! Received ${id}` });
    if (!isValidDreamUpdate(dream)) return res.status(400).json({ error: "Invalid dream update data" });

    const updatedDream = await updateDream(id, dream);
    if (!updatedDream) return res.status(404).json({ error: "Dream not found" });

    return res.status(200).json({ data: updatedDream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE DREAM
dreams.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) return res.status(400).json({ error: `id must be a positive integer! Received ${id}` });

    await deleteOne(id);
    return res.status(200).json({ message: "Dream deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = dreams;