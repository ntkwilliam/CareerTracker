const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());

const PAGE_SIZE = 10;



app.get('/data/alumni/search', (req, res) => {
        let baseQuery = 'SELECT students.student_id, last_name, first_name, middle_name, GROUP_CONCAT(DISTINCT graduation_term_code SEPARATOR \', \')' + 
        ' graduation_term_codes, GROUP_CONCAT(DISTINCT employer_name SEPARATOR \', \') employers' +
        ' FROM students LEFT JOIN student_employments on student_employments.student_id = students.student_id AND student_employments.active = 1' +
        ' LEFT JOIN employers ON student_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN student_degrees' +
        ' ON student_degrees.student_id = students.student_id AND student_degrees.deleted = 0 WHERE students.deleted = 0'
        let criteria = '';
        let propValues = [];
        for (let propName in req.query) {
            if (req.query.hasOwnProperty(propName) && propName != 'page') {
    
                  criteria += ' AND ' + propName + ' = ?';
                  propValues.push(req.query[propName]);
            }


        }

        criteria+= ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * PAGE_SIZE + ',' + PAGE_SIZE;

       dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
           if (!error) {
               res.send(results);
           }
           else
           {
               res.send('Unable to process request.  Reason: ' + error.message);
           }
       } );

    });



app.get('/data/alumni/byid/:id',  (req, res) => {

    
    let query = 'SELECT * FROM students WHERE student_id = ?';

    dbConnection.query(query, req.params['id'], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else 
        {
            res.send('Unable to process request.  Reason: ' + error.message);
        }
    });
    

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