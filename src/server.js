const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());





app.get("/data/alumni/search", (req, res) => {
    // Implement alumni search results HTTP endpoint
    });



app.get("/data/alumni/byid/:id",  (req, res) => {
// Implement alumni detail record HTTP endpoint
});


app.post("/data/alumni", (req, res) => {
// Implement alumni add functionality 
});


app.put("/data/alumni", (req, res) => {
// Implement alumni update functionality 
});


app.get("/data/employers/search", (req, res) => {
    // Implement employer search results HTTP endpoint
    });

app.get("/data/employers/byid/:id",  (req, res) => {
// Implement employer detail record HTTP endpoint
});


app.post("/data/employers", (req, res) => {
// Implement employer add functionality 
});


app.put("/data/employers", (req, res) => {
// Implement employer update functionality 
});


app.get("/data/graduate-schools/search", (req, res) => {
    // Implement graduate school search results HTTP endpoint
    });


app.get("/data/graduate-schools/byid/:id",  (req, res) => {
// Implement graduate school detail record HTTP endpoint
});


app.post("/data/graduate-schools", (req, res) => {
// Implement graduate school add functionality 
});


app.put("/data/graduate schools", (req, res) => {
// Implement graduate school update functionality 
});

app.post("/login", (req, res) => {
// Implement authentication credential validation HTTP endpoint
});

app.post("/imports", (req, res) => {
// Implement import CSV file submission HTTP endpoint
});


app.get("/exports/:reportID", (req, res) => {
// Implement exports/report functionality 
});

var dbConnection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'careertracker',
     password: '3ig7turh?',
     database: 'careertracker'
 });


app.listen(8080, function() {
    console.log("Server is listening on port 8080");

});