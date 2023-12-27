
  const express = require('express');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(express.json());

var cors = require("cors");

// app.use(cors());

// app.use(express.urlencoded({ extended: true }));

app.use(cors())


app.get("/", (req, res) => {
    res.send("This is an Night Sky Finder Application server");
  });

// Set up session middleware
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Define Passport strategies and other configurations (as shown in the previous example)

// ... Your route handlers and other configurations

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

  
  let findSpotController = require("./controller/findSpotController");
  app.use("/findspots", findSpotController);
  app.use("/newusers",findSpotController);
  // Error handling middleware (should be placed last)
  app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found!" });
  });
  

module.exports = app