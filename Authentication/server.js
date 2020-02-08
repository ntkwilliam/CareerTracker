// SET UP ===================================================================
//
// Development: npm i --save-dev dotenv nodemon 
// Application: npm i bcrypt body-parser ejs express express-flash express-session mysql passport passport-local
// Start the server: npm run devStart
// Go to LocalHost:3000 in browser

// App running in development TODO
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// IMPORTS ==================================================================

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');

const app = express();
const port = process.env.Port || 3000;

// CONFIGURATION ============================================================

require('./passport')(passport); // Load passport configuration file

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(flash()) // Display flash messages
app.set('view-engine', 'ejs') // Use ejs in template

// Requirements for passport
app.use(session({
    secret: 'itsasecrettoeveryone',
    resave: true,
    saveUnitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) // Persistent login sessions

// ROUTES ===================================================================

require('./routes.js')(app, passport); // Load routes and pass app and passport config

// LAUNCH ===================================================================

app.listen(port); // Port 3000
console.log('Application running on port ' + port);


