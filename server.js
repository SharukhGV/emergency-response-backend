// const passport = require("passport");
// require("./db/passportConfig")(passport);
const app = require("./Index.js");
// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');




require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});








