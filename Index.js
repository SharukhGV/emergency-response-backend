const express = require("express");
const app = express();

app.use(express.json());
var cors = require("cors");

// app.use(cors());

// app.use(express.urlencoded({ extended: true }));

app.use(cors())


let findSpotController = require("./controller/findSpotController");
app.use("/findspots", findSpotController);

app.get("/", (req, res) => {
    res.send("This is an Emergency Response Application for Good Samaritans and First Responders");
  });



  
  app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found!" });
  });


module.exports = app