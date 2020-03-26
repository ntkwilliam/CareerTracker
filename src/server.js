const express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
const app = express();
const cors = require('cors');

let connectionAttributes = require('./configuration/globals').connectionAttributes;


const flash = require('connect-flash')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());


require('./configuration/passport')(passport, app);
require('./configuration/routes/main.js')(app, express, passport);

app.listen(connectionAttributes.APPLICATION_PORT , function () {
    console.log("Server is listening on port " + connectionAttributes.APPLICATION_PORT);

});