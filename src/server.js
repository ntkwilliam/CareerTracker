const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const DEFAULT_PAGE_SIZE = 20;

const alumniValidator = require('./validations/alumni/alumni');

const tableData = {
    alumni: {
        keyField: string = 'alumnus_id'
    },
    alumni_degrees: {
        keyField: string = 'degree_id'
    },
    alumni_employments: {
        keyField: string = 'employment_id'
    },
    alumni_graduate_schools: {
        keyField: string = ['alumnus_id', 'graduate_school_id']
    }

}



app.get('/data/alumni/search', (req, res) => {
    let baseQuery = 'SELECT alumni.alumnus_id, last_name, first_name, middle_name, mailing_address_city, mailing_address_state, GROUP_CONCAT(DISTINCT graduation_term_code SEPARATOR \', \')' +
        ' graduation_term_codes, GROUP_CONCAT(DISTINCT employer_name SEPARATOR \', \') employers, GROUP_CONCAT(DISTINCT school_name SEPARATOR \', \') graduate_schools' +
        ' FROM alumni LEFT JOIN alumni_employments on alumni_employments.alumnus_id = alumni.alumnus_id AND alumni_employments.active = 1 AND alumni_employments.deleted = 0' +
        ' LEFT JOIN employers ON alumni_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN alumni_degrees' +
        ' ON alumni_degrees.alumnus_id = alumni.alumnus_id AND alumni_degrees.deleted = 0 LEFT JOIN alumni_graduate_schools ON alumni_graduate_schools.alumnus_id' +
        ' = alumni.alumnus_id AND alumni_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON alumni_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
        ' AND graduate_schools.deleted = 0 WHERE alumni.deleted = 0'
    let [criteria, propValues] = getQueryValues(req.query, 'alumni');

    criteria += ' GROUP BY alumni.alumnus_id, last_name, first_name, middle_name, mailing_address_city, mailing_address_state'
    criteria += ' ORDER BY last_name, first_name, middle_name';
    criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage);
    dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            res.status(400).send('Unable to process request.  Reason: ' + error.message);
        }
    });

});

app.get('/data/alumni/search/pageCount', (req, res) => {
    let baseQuery = 'SELECT COUNT(*) ItemCount FROM alumni LEFT JOIN alumni_employments on alumni_employments.alumnus_id = alumni.alumnus_id AND alumni_employments.active = 1 AND alumni_employments.deleted = 0' +
        ' LEFT JOIN employers ON alumni_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN alumni_degrees' +
        ' ON alumni_degrees.alumnus_id = alumni.alumnus_id AND alumni_degrees.deleted = 0 LEFT JOIN alumni_graduate_schools ON alumni_graduate_schools.alumnus_id' +
        ' = alumni.alumnus_id AND alumni_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON alumni_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
        ' AND graduate_schools.deleted = 0 WHERE alumni.deleted = 0'

    let [criteria, propValues] = getQueryValues(req.query, 'alumni');


    dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
        if (!error) {
            res.send({ pageCount: Math.ceil(results[0].ItemCount / (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage)) });
        }
        else {
            res.status(400).send('Unable to process request.  Reason: ' + error.message);
        }
    });

});






app.get('/data/alumni/byid/:id', (req, res) => {

    let result = {
        alumni: null,
        employments: null,
        graduateSchools: null,
        alumni_degrees: null,
        comments: null,
        errorResult: null

    };
    let query = 'SELECT * FROM alumni WHERE alumnus_id = ?';

    dbConnection.query(query, req.params['id'], (error, results, fields) => {
        if (!error) {
            result.alumni = results[0];


            query = 'SELECT employment_id, employers.employer_id, employer_name, city, state, job_title, active,  alumni_employments.added_by, alumni_employments.added_datetime,' +
                ' alumni_employments.updated_by, alumni_employments.updated_datetime FROM alumni_employments INNER JOIN employers ON alumni_employments.employer_id' +
                ' = employers.employer_id WHERE alumnus_id = ? AND alumni_employments.deleted = 0';
            dbConnection.query(query, req.params['id'], (error, results, fields) => {
                if (!error) {
                    result.employments = results;

                    query = 'SELECT degree_id, diploma_description, graduation_term_code, added_by, added_datetime, updated_by, updated_datetime' +
                        ' FROM alumni_degrees WHERE alumnus_id = ? AND deleted = 0';
                    dbConnection.query(query, req.params['id'], (error, results, fields) => {
                        if (!error) {
                            result.alumni_degrees = results;

                            query = 'SELECT graduate_schools.graduate_school_id, school_name, city, state, alumni_graduate_schools.added_by, alumni_graduate_schools.added_datetime,' +
                                ' alumni_graduate_schools.updated_by, alumni_graduate_schools.updated_datetime FROM alumni_graduate_schools INNER JOIN graduate_schools ON graduate_schools.graduate_school_id' +
                                ' = alumni_graduate_schools.graduate_school_id WHERE alumnus_id = ? AND alumni_graduate_schools.deleted = 0';
                            dbConnection.query(query, req.params['id'], (error, results, fields) => {
                                if (!error) {
                                    result.graduateSchools = results;


                                    query = 'SELECT comment_id, comment, added_by, added_datetime FROM comments WHERE entity_type = \'S\' AND entity_id = ? AND deleted = 0';
                                    dbConnection.query(query, req.params['id'], (error, results, fields) => {
                                        if (!error) {
                                            result.comments = results;
                                            res.send(result);
                                        }
                                        else {
                                            result.errorResult = error;
                                            res.send(result);
                                        }

                                    });

                                }
                                else {
                                    result.errorResult = error;
                                    res.send(result);
                                }


                            });


                        }
                        else {
                            result.errorResult = error;
                            res.send(result);
                        }
                    });

                }
                else {
                    result.errorResult = error;
                    res.send(result);
                }
            });



        }

        else {
            result.errorResult = error;
            res.send(result);
        }

    });








});





app.get("/data/alumni/childData", (req, res) => {

    result = {
        error: false,
        data: null
    }



    selectString: String;
    if (!tableData[req['record_type']]) {
   
        result.error = true;
        result.data = 'Table specified is not valid for this operation.';
        res.send(result);
        return;

    }
    

    dbConnection.query('SELECT * FROM ?? WHERE ?? = ?', [req.query['record_type'],tableData[req.query['record_type']].keyField,req.query['record_id']], (errors, results, fields) => {
        if (errors) {
            error = true;
            data = errors;
        }
        else {
            result.data = results[0];
        }

        res.send(result);
    });

});



app.post("/data/alumni", (req, res) => {
    res.send(req.body);
});

app.delete("/delete/alumni", (req, res) => {
result = {
    success: false,
    error: null
}

if (!req.params['record_type'] || !req.params['record_id']) {
    result.error = 'Requested parameters were not supplied.';   
 
res.send(result);
}
else
 {
    dbConnection.query('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [recordType, keyField, req.params['record_id']], (err, update_result) => {
    if (err) {
        result.error = error
    }
    else
    {
        result.success = true;
    }
    
res.send(result);
    });
}

})



app.put("/data/alumni", (req, res) => {
    result = {
        validationError: false,
        otherError: false,
        data: null
    }
    alumniData = req.body;

    if (!recordType || !keyField) {
        result.otherError = 'Required record and key data missing from request.';

    }
    else {
    recordType = alumniData['recordType']
    keyField = alumniData['keyField']
    const validator = new alumniValidator();
    let errorsExist;
    let errors;


    if (recordType == 'alumni') {
        [errorsExist, errors] = validator.validateAlumniRecord(alumniData.data);
    }
    else {
     [errorsExist, errors] = validator.validateChildRecord(recordType, alumniData.data);
    }


    if (errorsExist) {
        result.validationError = true;
        result.data = errors;
        res.send(result);
    }
    else {
        dbConnection.query('SELECT * FROM ?? where ?? = ?', [recordType, keyField, alumniData['data'][keyField]], (errors, results, fields) => {
            
            let existingStudent = results[0];
            changeFound = false;

            changedFieldValues = {};
            queryString = '';
            for (let prop in alumniData['data']) {
                if (Object.prototype.hasOwnProperty.call(alumniData['data'], prop)) {
                    if (alumniData[prop] != existingStudent[prop]) {
                        changeFound = true;


                        changedFieldValues[prop] = alumniData['data'][prop];


                    }

                }



            }
            if (changeFound) {
                changedFieldValues[keyField] = alumniData['data'][keyField];
                queryString = queryString + ',?? = ?, `updated_datetime` = NOW()';
                //	dbConnection.query('UPDATE alumni SET ' + queryString + ' WHERE alumnus_id = ?',changedFieldValues, (err, update_result) => {

                dbConnection.query('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', [recordType, changedFieldValues, keyField, alumniData['data'][keyField]], (err, update_result) => {
                    if (err) {

                        result.otherError = true;
                        result.data = err;
                        res.send(result);

                    }
                    else {
                        dbConnection.query('SELECT * FROM ?? where ?? = ?', [recordType, keyField, alumniData['data'][keyField]], (errors, results, fields) => {
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
}
});




app.get("/data/employers/selectionList", (req, res) => {
    let query = "SELECT employer_id value, employer_name text from employers WHERE deleted = 0 ORDER BY employer_name";

    dbConnection.query(query, (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            res.status(400).send('Unable to process request.  Reason: ' + error.message);
        }
    });



});


app.get("/data/employers/search", (req, res) => {
    // Implement employer search results HTTP endpoint
});

app.get("/data/employers/byid/:id", (req, res) => {
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
        else {
            res.status(400).send('Unable to process request.  Reason: ' + error.message);
        }
    });
});

app.get("/data/graduate-schools/search", (req, res) => {
    // Implement graduate school search results HTTP endpoint
});


app.get("/data/graduate-schools/byid/:id", (req, res) => {
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
            if (propName.endsWith("_id")) {

                let intID = parseInt(queryValues[propName]);
                if (intID == NaN) {
                    propValues.push(queryValues[propName]);

                }
                else {
                    propValues.push(intID);


                }
            }
            else {
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

    alumni: {
        employer: "alumni.alumnus_id IN (SELECT alumnus_id from alumni_employments WHERE employer_id = ? AND active = 1 and deleted = 0)",
        graduateSchool: "alumni.alumnus_id IN (SELECT alumnus_id from alumni_graduate_schools WHERE graduate_school_id = ? and deleted = 0)"
    }


}


var dbConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'careertracker',
    password: '3ig7turh?',
    database: 'careertracker'
});


app.listen(8080, function () {
    console.log("Server is listening on port 8080");

});