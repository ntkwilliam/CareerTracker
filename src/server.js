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

const alumniValidator = require('./validations/alumni/alumni');

app.get('/data/alumni/search', (req, res) => {
        let baseQuery = 'SELECT students.student_id, last_name, first_name, middle_name, mailing_address_city, mailing_address_state, GROUP_CONCAT(DISTINCT graduation_term_code SEPARATOR \', \')' + 
        ' graduation_term_codes, GROUP_CONCAT(DISTINCT employer_name SEPARATOR \', \') employers, GROUP_CONCAT(DISTINCT school_name SEPARATOR \', \') graduate_schools' +
        ' FROM students LEFT JOIN student_employments on student_employments.student_id = students.student_id AND student_employments.active = 1 AND student_employments.deleted = 0' +
        ' LEFT JOIN employers ON student_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN student_degrees' +
        ' ON student_degrees.student_id = students.student_id AND student_degrees.deleted = 0 LEFT JOIN student_graduate_schools ON student_graduate_schools.student_id' +
        ' = students.student_id AND student_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON student_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
        ' AND graduate_schools.deleted = 0 WHERE students.deleted = 0'
        let [criteria, propValues] = getQueryValues(req.query,'students');

        criteria += ' GROUP BY students.student_id, last_name, first_name, middle_name, mailing_address_city, mailing_address_state'
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

        let [criteria, propValues] = getQueryValues(req.query, 'students');

        
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

    let result = {
        alumni: null,
        employments: null,
        graduateSchools: null,
        degrees: null,
        comments: null,
        errorResult: null

    };
    let query = 'SELECT * FROM students WHERE student_id = ?';

    dbConnection.query(query, req.params['id'], (error, results, fields) => {
        if (!error) {
            result.alumni = results[0];


            query = 'SELECT employment_id, employers.employer_id, employer_name, city, state, job_title, active,  student_employments.added_by, student_employments.added_datetime,' +
            ' student_employments.updated_by, student_employments.updated_datetime FROM student_employments INNER JOIN employers ON student_employments.employer_id' + 
            ' = employers.employer_id WHERE student_id = ? AND student_employments.deleted = 0';
            dbConnection.query(query, req.params['id'], (error, results, fields) => {
                if (!error) {
                    result.employments = results;

                    query = 'SELECT degree_id, diploma_description, graduation_term_code, added_by, added_datetime, updated_by, updated_datetime' +
            ' FROM student_degrees WHERE student_id = ? AND deleted = 0';
            dbConnection.query(query, req.params['id'], (error, results, fields) => {
                if (!error) {
                    result.degrees = results;
                    
                    query = 'SELECT graduate_schools.graduate_school_id, school_name, city, state, student_graduate_schools.added_by, student_graduate_schools.added_datetime,' +
            ' student_graduate_schools.updated_by, student_graduate_schools.updated_datetime FROM student_graduate_schools INNER JOIN graduate_schools ON graduate_schools.graduate_school_id' + 
            ' = student_graduate_schools.graduate_school_id WHERE student_id = ? AND student_graduate_schools.deleted = 0';
            dbConnection.query(query, req.params['id'], (error, results, fields) => {
                if (!error) {
                    result.graduateSchools = results;


                    query = 'SELECT comment_id, comment, added_by, added_datetime FROM comments WHERE entity_type = \'S\' AND entity_id = ? AND deleted = 0'; 
                    dbConnection.query(query, req.params['id'], (error, results, fields) => {
                        if (!error) {
                            result.comments = results;
                            res.send(result);
                }
                else
                {
                    result.errorResult = error;
                    res.send(result);
                }

            });

                }
                else 
                {
                    result.errorResult = error;
                    res.send(result);
                }


            });

                    
                }
                else
                {
                    result.errorResult = error;
                    res.send(result);
                }
            });

        }
            else
            {
                result.errorResult = error;
                res.send(result);
            }
        });


            
        }
        
            else
            {
                result.errorResult = error;
                res.send(result);
            }
            
        });
            
        
            

		
    


    });
    
	









app.post("/data/alumni", (req, res) => {
res.send(req.body);
});


app.put("/data/alumni", (req, res) => {
	result = {
        validationError: false,
        otherError: false,
        data: null
    }
    alumniData = req.body;
    const validator = new alumniValidator();
    let [errorsExist, errors] = validator.validateAlumniRecord(alumniData);
    if (errorsExist) {
        result.validationError = true;
        result.data = errors;
        res.send(result); 
    }
    else {
	dbConnection.query('SELECT * FROM students where student_id = ?', alumniData['student_id'], (errors, results, fields) => {
	
	let existingStudent = results[0];
	changeFound = false;
	
	changedFieldValues = {};
	queryString = '';
	for (let prop in alumniData) {
	if (Object.prototype.hasOwnProperty.call(alumniData , prop)) {
		if (alumniData[prop] != existingStudent[prop]) {
			changeFound = true;
			

			changedFieldValues[prop] = alumniData[prop];
			

		}
	
	}	
	


	}
	if (changeFound) {
		
		
		changedFieldValues['student_id'] = alumniData['student_id'];
        queryString = queryString + ',?? = ?, `updated_datetime` = NOW()';
	//	dbConnection.query('UPDATE students SET ' + queryString + ' WHERE student_id = ?',changedFieldValues, (err, update_result) => {

        dbConnection.query('UPDATE students SET ?, updated_datetime = NOW() WHERE student_id = ?',[changedFieldValues, 1], (err, update_result) => {
		if (err) {
            
            result.otherError = true;
            result.data = err;
            res.send(result);
            
		}   
		else {
			dbConnection.query('SELECT * FROM students where student_id = ?', alumniData['student_id'], (errors, results, fields) => {
			if (errors) {
			
                result.otherError = true;
                result.data = errors;
                res.send(result);
			}
			else {
        
            result.data = results[0];
            
            res.send(result);
			
			}	

			

		

});

}



});

        }


    });
    }
    
});





app.get("/data/employers/selectionList", (req, res) => {
    let query = "SELECT employer_id value, employer_name text from employers WHERE deleted = 0 ORDER BY employer_name";

    dbConnection.query(query, (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else 
        {
            res.status(400).send('Unable to process request.  Reason: ' + error.message);
        }
    });
   


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

app.get("/data/graduate-schools/selectionList", (req, res) => {
    let query = "SELECT graduate_school_id value, school_name text from graduate_schools WHERE deleted = 0 ORDER BY school_name";

    dbConnection.query(query, (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else 
        {
            res.status(400).send('Unable to process request.  Reason: ' + error.message);
        }
    });
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

getQueryValues = (queryValues, entityName) => {
        let criteria = '';
        let propValues = [];
        for (let propName in queryValues) {
            if (queryValues.hasOwnProperty(propName) && propName != 'page' && propName != 'itemsPerPage') {
                   if(propName.endsWith("_id"))
                   {

                       let intID = parseInt(queryValues[propName]);
                        if (intID == NaN) {
                            propValues.push(queryValues[propName]);
                            
                        }
                        else 
                        {
                            propValues.push(intID);
                          

                        }
                   } 
                   else 
                   {
                    propValues.push(queryValues[propName]);
                    
                   }
                
                   if (specialQueryStrings[entityName][propName] == undefined) {
                       criteria += ' AND ' + propName + ' = ?';
                   }
                   else {
                    criteria += ' AND ' + specialQueryStrings[entityName][propName];
                   }
            }
        }
            return [criteria, propValues];
        
};

const specialQueryStrings = {

    students: {
        employer: "students.student_id IN (SELECT student_id from student_employments WHERE employer_id = ? AND active = 1 and deleted = 0)",
        graduateSchool: "students.student_id IN (SELECT student_id from student_graduate_schools WHERE graduate_school_id = ? and deleted = 0)" 
    }


}


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