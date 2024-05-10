
  const express = require('express');
// const passport = require('passport');
// const session = require('express-session');

const app = express();

app.use(express.json());

var cors = require("cors");

// app.use(cors());

// app.use(express.urlencoded({ extended: true }));

app.use(cors())

let newUserController = require("./controller/newUserController");

let userpostController = require("./controller/userpostController");//uncomment this

let commentsController = require("./controller/commentsController");

let profileController = require("./controller/profileController");


app.get("/", (req, res) => {
    res.send("This is an Night Sky Finder Application server");
  });


app.use("/newusers", newUserController); // Use newUserController for /newusers endpoint

app.use("/userposts", userpostController); // Used to be findSpotController for /findspots
app.use("/comments", commentsController);
app.use("/profile" , profileController)

// Error handling middleware (should be placed last)
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});
  
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

module.exports = app