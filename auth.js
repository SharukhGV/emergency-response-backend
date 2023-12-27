// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const { Pool } = require('pg'); // Using pg library to interact with PostgreSQL

// // Set up the connection pool to your PostgreSQL database
// const pool = new Pool({
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
//   database: process.env.PG_DATABASE,
//   user: process.env.PG_USER,
//   password: process.env.PG_PW,

// });

// // Passport LocalStrategy for handling username/password authentication
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
//       if (err) {
//         return done(err);
//       }
      
//       const user = result.rows[0];
//       if (!user) {
//         return done(null, false);
//       }
      
//       // Validate password - You might have a separate function to handle this
//       if (!validatePassword(password, user.password)) {
//         return done(null, false);
//       }
      
//       return done(null, user);
//     });
//   }
// ));

// // Example function to validate passwords (replace this with your own logic)
// function validatePassword(inputPassword, userPassword) {
//   // Implement your password validation logic here

//   if (inputPassword === userpassword) return inputPassword === userPassword; // Example: Comparing plaintext passwords
  
// }

// // Serialize and deserialize user instances to maintain login sessions
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
//     if (err) {
//       return done(err);
//     }
    
//     const user = result.rows[0];
//     done(null, user);
//   });
// });

// // Example of integrating Passport with Express.js (not included in the code above)
// // app.use(passport.initialize());
// // app.use(passport.session());
// // ... Rest of your Express.js configuration
