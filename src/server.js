const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));
const DEFAULT_PAGE_SIZE = 20;



app.get('/data/alumni/search', (req, res) => {
        let baseQuery = 'SELECT students.student_id, last_name, first_name, middle_name, mailing_address_city, mailing_address_state, GROUP_CONCAT(DISTINCT graduation_term_code SEPARATOR \', \')' + 
        ' graduation_term_codes, GROUP_CONCAT(DISTINCT employer_name SEPARATOR \', \') employers, GROUP_CONCAT(DISTINCT school_name SEPARATOR \', \') graduate_schools' +
        ' FROM students LEFT JOIN student_employments on student_employments.student_id = students.student_id AND student_employments.active = 1 AND student_employments.deleted = 0' +
        ' LEFT JOIN employers ON student_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN student_degrees' +
        ' ON student_degrees.student_id = students.student_id AND student_degrees.deleted = 0 LEFT JOIN student_graduate_schools ON student_graduate_schools.student_id' +
        ' = students.student_id AND student_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON student_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
        ' AND graduate_schools.deleted = 0 WHERE students.deleted = 0'
        let criteria = '';
        let propValues = [];
        for (let propName in req.query) {
            if (req.query.hasOwnProperty(propName) && propName != 'page' && propName != 'itemsPerPage') {
    
                  criteria += ' AND ' + propName + ' = ?';
                  propValues.push(req.query[propName]);
            }


        }

        criteria += ' ORDER BY last_name, first_name, middle_name';
        criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage);
       dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
           if (!error) {
               res.send(results);
           }
           else
           {
               res.status(400).send('Unable to process request.  Reason: ' + error.message);
           }
       } );

    });

    app.get('/data/alumni/search/pageCount', (req, res) => {
        let baseQuery = 'SELECT COUNT(*) ItemCount FROM students LEFT JOIN student_employments on student_employments.student_id = students.student_id AND student_employments.active = 1 AND student_employments.deleted = 0' +
        ' LEFT JOIN employers ON student_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN student_degrees' +
        ' ON student_degrees.student_id = students.student_id AND student_degrees.deleted = 0 LEFT JOIN student_graduate_schools ON student_graduate_schools.student_id' +
        ' = students.student_id AND student_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON student_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
        ' AND graduate_schools.deleted = 0 WHERE students.deleted = 0'
        let criteria = '';
        let propValues = [];
        for (let propName in req.query) {
            if (req.query.hasOwnProperty(propName) && propName != 'page' && propName != 'itemsPerPage') {
    
                  criteria += ' AND ' + propName + ' = ?';
                  propValues.push(req.query[propName]);
            }


        }

             dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
           if (!error) {
            res.send({ pageCount : Math.ceil(results[0].ItemCount / (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage))});
           }
           else
           {
                res.status(400).send('Unable to process request.  Reason: ' + error.message);
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
            res.status(400).send('Unable to process request.  Reason: ' + error.message);
        }
    });
    

});


app.post("/data/alumni", (req, res) => {
res.send(req.body);
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