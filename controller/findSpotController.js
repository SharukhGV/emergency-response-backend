
const express = require("express");
const findspot = express.Router();
const {
    getAllFindSpots,
    getOneFindSpot,
    updateOneFindSpot,
    createFindSpot,
} = require("../queries/findspot");

// require('dotenv').config()

// const config ={
//   CLIENT_ID: process.env.CLIENT_ID,
// CLIENT_SECRET: process.env.CLIENT_SECRET}


// function checkLoggedIn((req,res,next))=>{
//   const isLoggIn = true
//   if(!isLoggIn){
//     return res.status(401).json({error: 'you must log in'})
//   }
//     next();
//   }

//   dreams.get('auth/google',(req,res)=>{})
//   dreams.get('auth/google/callback',(req,res)=>{})
//   dreams.get('auth/logout',(req,res)=>{})


// dreams.get('secret',checkLoggedIn,(req,res)){
//   return res.send('success')
// }

findspot.get("/", async (req, res) => {
  try {
    const findspots = await getAllFindSpots();
    res.json(findspots);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "sError getting all find-spots!" });
  }
});

findspot.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findspot = await getOneFindSpot(id);
    res.json(findspot);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "That findspot does not exist!" });
  }
});

findspot.put("/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const findspot = req.body;

    const updatedfindspot = await updateOneFindSpot(id, findspot);
    res.json(updatedfindspot);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot Update Archive Status of specified findspot" });
  }
});


findspot.post("/", async (req, res) => {
  try {
    const findspot = req.body;

    const createdfindspot = await createFindSpot(findspot);
    res.json(createdfindspot);
} catch (error) {
    console.log(error);
    console.log("Incoming request body:", req.body);
    res.status(400).json({ error: "Incorrect post body" });

}
});

module.exports = findspot;

