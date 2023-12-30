
  const express = require('express');
// const passport = require('passport');
// const session = require('express-session');

const app = express();

app.use(express.json());

var cors = require("cors");

// app.use(cors());

// app.use(express.urlencoded({ extended: true }));

app.use(cors())

// let findSpotController = require("./controller/findSpotController");//uncomment this
let newUserController = require("./controller/newUserController");

app.get("/", (req, res) => {
    res.send("This is an Night Sky Finder Application server");
  });

// app.use("/findspots", findSpotController); // Use findSpotController for /findspots endpoint // uncomment this
app.use("/newusers", newUserController); // Use newUserController for /newusers endpoint

// Error handling middleware (should be placed last)
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});
  
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app