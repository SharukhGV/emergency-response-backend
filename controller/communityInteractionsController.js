const express = require("express");
const communityInteractions = express.Router();
const {
  patcheInformative,
  patcheSurprising,
  patcheThanks,
  getAllCommunityInteractions} = require("../queries/communityinteractions");


communityInteractions.put("/", async (req, res) => {
    try {
      const communityInteraction = req.body;
console.log(communityInteraction)
let keyVALS = Object.keys(communityInteraction)

  if (keyVALS.includes("informative")){
      const createdcommunityInteraction = await patcheInformative(communityInteraction);
      return res.status(201).json({ data: createdcommunityInteraction });
  }
  if (keyVALS.includes("thanks")){
    const createdcommunityInteraction = await patcheThanks(communityInteraction);
    return res.status(201).json({ data: createdcommunityInteraction });
}
else  if (keyVALS.includes("surprising")){
  const createdcommunityInteraction = await patcheSurprising(communityInteraction);
  return res.status(201).json({ data: createdcommunityInteraction });
}
    } catch (error) {
  
      return res.status(500).json({ error: "Internal Server Error" });
  
    }
  });


  
  communityInteractions.get("/", async (req, res) => {
    try {
      const cIposts = await getAllCommunityInteractions();
  
      return res.status(200).json({ data: cIposts })
  
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  


  
  module.exports = communityInteractions
  