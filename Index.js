
const express = require('express');

const app = express();

app.use(express.json());

var cors = require("cors");

app.use(cors())

let newUserController = require("./controller/newUserController");

let userpostController = require("./controller/userpostController");

let commentsController = require("./controller/commentsController");

let profileController = require("./controller/profileController");


let dreamController = require("./controller/dreamController");




app.get("/", (req, res) => {
  res.send("This is an Night Sky Finder Application server");
});


app.use("/newusers", newUserController);
app.use("/userposts", userpostController);
app.use("/comments", commentsController);
app.use("/profile", profileController)
app.use("/dreams", dreamController);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});



module.exports = app