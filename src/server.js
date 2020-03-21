const express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
const app = express();
const cors = require('cors');

// Configure APPLICATION_PORT to the port on which the application should run.
const APPLICATION_PORT = 8080;

// Configure database connection attributes as needed if MySQL is not running on local host or alternative database/username/password/port configuration is required.
const DB_HOSTNAME = 'localhost';
const DB_PORT = 3306;
const DB_DATABASE_NAME = 'careertracker'
const DB_USERNAME = 'careertracker'
const DB_PASSWORD = '3ig7turh?'

require('./configuration/routes/database').initialize({
    DB_DATABASE_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME
});

const flash = require('connect-flash')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());


require('./configuration/passport')(passport, app);
require('./configuration/routes/main.js')(app, express, passport);

app.listen(APPLICATION_PORT , function () {
    console.log("Server is listening on port " + APPLICATION_PORT);

});