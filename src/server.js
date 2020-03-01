const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const DEFAULT_PAGE_SIZE = 15;

const alumniValidator = require('./validations/alumni');
const employerValidator = require('./validations/employers');
const graduateSchoolValidator = require('./validations/graduateSchools');




app.get('/data/alumni/search', (req, res) => {
    let baseQuery = 'SELECT alumni.alumnus_id, last_name, first_name, middle_name, CONCAT(mailing_address_city,\', \', mailing_address_state) location, GROUP_CONCAT(DISTINCT graduation_term_code SEPARATOR \', \')' +
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
            console.log(error);
                sendErrorResponse(res,error.message);
        }
    });

});

app.get('/data/alumni/search/pageCount', (req, res) => {
    let baseQuery = 'SELECT COUNT(DISTINCT alumni.alumnus_id) ItemCount FROM alumni LEFT JOIN alumni_employments on alumni_employments.alumnus_id = alumni.alumnus_id AND alumni_employments.active = 1 AND alumni_employments.deleted = 0' +
        ' LEFT JOIN employers ON alumni_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN alumni_degrees' +
        ' ON alumni_degrees.alumnus_id = alumni.alumnus_id AND alumni_degrees.deleted = 0 LEFT JOIN alumni_graduate_schools ON alumni_graduate_schools.alumnus_id' +
        ' = alumni.alumnus_id AND alumni_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON alumni_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
        ' AND graduate_schools.deleted = 0 WHERE alumni.deleted = 0'

    let [criteria, propValues] = getQueryValues(req.query, 'alumni');
  

    dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
        if (!error) {
            console.log(results);
            res.send({ pageCount: Math.ceil(results[0].ItemCount / (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage)) });
        }
        else {
            sendErrorResponse(res,error.message);
        }
    });

});






app.get('/data/alumni/byid/:id', (req, res) => {

    let result = {
        alumni: null,
        alumni_employments: null,
        graduateSchools: null,
        alumni_degrees: null,
        comments: null,
        

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
                    result.alumni_employments = results;

                    query = 'SELECT degree_id, diploma_description, graduation_term_code, added_by, added_datetime, updated_by, updated_datetime' +
                        ' FROM alumni_degrees WHERE alumnus_id = ? AND deleted = 0';
                    dbConnection.query(query, req.params['id'], (error, results, fields) => {
                        if (!error) {
                            result.alumni_degrees = results;

                            query = 'SELECT alumnus_id, alumni_graduate_school_id, graduate_schools.graduate_school_id, school_name, city, state, alumni_graduate_schools.added_by, alumni_graduate_schools.added_datetime,' +
                                ' alumni_graduate_schools.updated_by, alumni_graduate_schools.updated_datetime FROM alumni_graduate_schools INNER JOIN graduate_schools ON graduate_schools.graduate_school_id' +
                                ' = alumni_graduate_schools.graduate_school_id WHERE alumnus_id = ? AND alumni_graduate_schools.deleted = 0';
                            dbConnection.query(query, req.params['id'], (error, results, fields) => {
                                if (!error) {
                                    result.alumni_graduate_schools = results;


                                    query = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'A\' AND entity_id = ? AND deleted = 0';
                                    dbConnection.query(query, req.params['id'], (error, results, fields) => {
                                        if (!error) {
                                            result.comments = results;
                                            res.send(result);
                                        }
                                        else {   
                                            sendErrorResponse(res,error.message);
                                        }
                                    });
                                }
                                else {
                                    sendErrorResponse(res,error.message);
                                }
                            });
                        }
                        else {
                            sendErrorResponse(res,error.message);
                        }
                    });

                }
                else {
                    sendErrorResponse(res,error.message);
                }
            });
        }

        else {
            sendErrorResponse(res,error.message);
        }

    });



});





app.get("/data/alumni/childData", (req, res) => {

    result = {
        data: null
    }



    selectString: String;
    
    if (!tableData[req.query['record_type']]) {
       sendErrorResponse(res,'Record type specified is not valid for this operation.');
        return;
    }
    
    dbConnection.query(tableData[req.query['record_type']].recordQueryString,req.query['record_id'], (error, results, fields) => {
        if (error) {
            sendErrorResponse(res,error.message);
        }
        else {
            result.data = results[0];
            res.send(result);
        }

    });

});



app.delete("/data/alumni", (req, res) => {
let keyField;

if (!req.query['record_type'] || !req.query['record_id']) {
    sendErrorResponse(res,'Required parameters were not supplied.');   
 

}

else if (tableData[req.query['record_type']] == null || (keyField = tableData[req.query['record_type']]['keyField']) == null)
{

   sendErrorResponse(res,'Record type specified is not valid for this operation.');

}

else
 {
    
    dbConnection.query('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [req.query['record_type'], keyField, req.query['record_id']], (error, update_result) => {
    
        if (error) {
        sendErrorResponse(res, error.message);
    }
    else
    {
        res.send({
            message: 'Request has been processed'
        });
    
    }
    

    });
}

});



app.post("/data/alumni", (req, res) => {
    result = {
        validationError: false,
        otherError: false,
        noChange: false,
        data: null
    }
    alumniData = req.body;
    
    if (!alumniData['recordType'] || !tableData[alumniData['recordType']]) {
        result.otherError = true;
        result.data = 'Record type is missing or invalid.';
        
        res.send(result);
    }
    else {
    let recordType = alumniData['recordType'];
    let keyField = tableData[alumniData['recordType']].keyField;
    let data = alumniData['data'];
    const validator = new alumniValidator();
    let errorsExist;
    let errors;


    if (recordType == 'alumni') {
        [errorsExist, errors] = validator.validateAlumniRecord(data);
    }
    else {
     [errorsExist, errors] = validator.validateChildRecord(recordType, data);
    }


    if (errorsExist) {
        result.validationError = true;
        result.data = errors;
        console.log(result);
        res.send(result);
    }
    else {
     
        let [changesFound, newData] = detectChanges(null, data);
        newData['added_by'] = newData['updated_by'] = 'CURRENTUSER';
        
        
        dbConnection.query('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', [recordType, newData], (errors, results, fields) => {
            
            dbConnection.query(tableData[recordType].recordQueryString, results.insertId, (errors, results, fields) => {
                console.log(errors);
                console.log(results);
                result.data = results;
                res.send(result);
                      
    
            });

        });

    }   

    }
});


app.put("/data/alumni", (req, res) => {
    result = {
        validationError: false,
        otherError: false,
        noChange: false,
        data: null
    }
    alumniData = req.body;
    
    if (!alumniData['recordType'] || !tableData[alumniData['recordType']]) {
        result.otherError = true;
        result.data = 'Record type is missing or invalid.';
        res.send(result);
    }
    else {
    let recordType = alumniData['recordType'];
    let keyField = tableData[alumniData['recordType']].keyField;
    let data = alumniData['data'];
    const validator = new alumniValidator();
    let errorsExist;
    let errors;


    if (recordType == 'alumni') {
        [errorsExist, errors] = validator.validateAlumniRecord(data);
    }
    else {
     [errorsExist, errors] = validator.validateChildRecord(recordType, data);
    }


    if (errorsExist) {
        result.validationError = true;
        result.data = errors;
        res.send(result);
    }
    else {
     
        dbConnection.query(tableData[recordType].recordQueryString, data[keyField], (errors, results, fields) => {
        

            let [changesFound, changedFieldValues] = detectChanges(results[0], data);

            if (changesFound) {
               // changedFieldValues[keyField] = data[keyField];
    
               changedFieldValues['updated_by'] = 'CURRENTUSER';
                dbConnection.query('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', [recordType, changedFieldValues, keyField, data[keyField]],
                 (err, update_result) => {
                    if (err) {

                        result.otherError = true;
                        result.data = err;
                        res.send(result);

                    }
                    else {
                        dbConnection.query(tableData[recordType].recordQueryString, data[keyField], (errors, results, fields) => {
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
            else {
                result.noChange = true;
                res.send(result);
            }
        });
    }
      

    }
});


detectChanges = (existingRecord, updatedRecord) => {

    changesFound = false;

    changedFieldValues = {};
    queryString = '';
    for (let prop in updatedRecord) {
        if (Object.prototype.hasOwnProperty.call(updatedRecord, prop)) {
            if (!existingRecord && updatedRecord[prop] != '' || existingRecord &&  existingRecord[prop] != updatedRecord[prop]) {
                changesFound = true;
                changedFieldValues[prop] = updatedRecord[prop];
            }

        }

    }
   

   return [changesFound, changedFieldValues]





}


app.get("/data/employers/selectionList", (req, res) => {
    let query = "SELECT employer_id value, CASE WHEN city IS NULL THEN employer_name ELSE CONCAT(employer_name," +
     "', ',city ,', ',state) END text from employers WHERE deleted = 0 ORDER BY employer_name, state, city";

    dbConnection.query(query, (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            sendErrorResponse(res,error.message);
        }
    });



});




app.get('/data/employers/search', (req, res) => {
    let baseQuery = 'SELECT employer_id, employer_name, city, state FROM employers WHERE deleted = 0'
    let [criteria, propValues] = getQueryValues(req.query, 'employers');

    criteria += ' ORDER BY employer_name, state, city';
    criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage);
    dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            console.log(error);
                sendErrorResponse(res,error.message);
        }
    });

});



app.get('/data/employers/search/pageCount', (req, res) => {
    let baseQuery = 'SELECT COUNT(DISTINCT employer_id) ItemCount FROM employers WHERE deleted = 0'

    let [criteria, propValues] = getQueryValues(req.query, 'employers');
  

    dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
        if (!error) {
            console.log(results);
            res.send({ pageCount: Math.ceil(results[0].ItemCount / (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage)) });
        }
        else {
            sendErrorResponse(res,error.message);
        }
    });

});

app.get('/data/employers/byid/:id', (req, res) => {

    let result = {
        employer: null,
        comments: null
        

    };




    let query = 'SELECT * FROM employers WHERE employer_id = ?';

    dbConnection.query(query, req.params['id'], (error, results, fields) => {
        if (!error) {
            result.employer = results[0];


                                    query = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'E\' AND entity_id = ? AND deleted = 0';
                                    dbConnection.query(query, req.params['id'], (error, results, fields) => {
                                        if (!error) {
                                            result.comments = results;
                                            res.send(result);
                                        }
                                        else {   
                                            sendErrorResponse(res,error.message);
                                        }
                                    });
        }
        else {
            sendErrorResponse(res,error.message);
        }

    });



});



app.get("/data/employers/childData", (req, res) => {

    result = {
        data: null
    }



    selectString: String;
    
    if (!tableData[req.query['record_type']]) {
       sendErrorResponse(res,'Record type specified is not valid for this operation.');
        return;
    }
    
    dbConnection.query(tableData[req.query['record_type']].recordQueryString,req.query['record_id'], (error, results, fields) => {
        if (error) {
            sendErrorResponse(res,error.message);
        }
        else {
            result.data = results[0];
            res.send(result);
        }

    });

});




app.post("/data/employers", (req, res) => {
    result = {
        validationError: false,
        otherError: false,
        noChange: false,
        data: null
    }
    employerData = req.body;
    
    if (!employerData['recordType'] || !tableData[employerData['recordType']]) {
        result.otherError = true;
        result.data = 'Record type is missing or invalid.';
        
        res.send(result);
    }
    else {
    let recordType = employerData['recordType'];
    let keyField = tableData[employerData['recordType']].keyField;
    let data = employerData['data'];
    const validator = new employerValidator();
    let errorsExist;
    let errors;


    if (recordType == 'employer') {
        [errorsExist, errors] = validator.validateemployerRecord(data);
    }
    else {
     [errorsExist, errors] = validator.validateChildRecord(recordType, data);
    }


    if (errorsExist) {
        result.validationError = true;
        result.data = errors;
        console.log(result);
        res.send(result);
    }
    else {
     
        let [changesFound, newData] = detectChanges(null, data);
        newData['added_by'] = newData['updated_by'] = 'CURRENTUSER';
        
        
        dbConnection.query('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', [recordType, newData], (errors, results, fields) => {
            
            dbConnection.query(tableData[recordType].recordQueryString, results.insertId, (errors, results, fields) => {
                console.log(errors);
                console.log(results);
                result.data = results;
                res.send(result);
                      
    
            });

        });

    }   

    }
});


app.put("/data/employers", (req, res) => {
    result = {
        validationError: false,
        otherError: false,
        noChange: false,
        data: null
    }
    employerData = req.body;
    console.log(employerData);
    if (!employerData['recordType'] || !tableData[employerData['recordType']]) {
        result.otherError = true;
        result.data = 'Record type is missing or invalid.';
        res.send(result);
    }
    else {
    let recordType = employerData['recordType'];
    let keyField = tableData[employerData['recordType']].keyField;
    let data = employerData['data'];
    const validator = new employerValidator();
    let errorsExist;
    let errors;


    if (recordType == 'employers') {

        [errorsExist, errors] = validator.validateEmployerRecord(data);
    }
    else {
     [errorsExist, errors] = validator.validateChildRecord(recordType, data);
    }

    if (errorsExist) {
        result.validationError = true;
        result.data = errors;
        res.send(result);
    }
    else {
     
        dbConnection.query(tableData[recordType].recordQueryString, data[keyField], (errors, results, fields) => {
        

            let [changesFound, changedFieldValues] = detectChanges(results[0], data);
          
            if (changesFound) {
               // changedFieldValues[keyField] = data[keyField];
            console.log(keyField);
               changedFieldValues['updated_by'] = 'CURRENTUSER';
                dbConnection.query('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', [recordType, changedFieldValues, keyField, data[keyField]],
                 (err, update_result) => {
                    if (err) {
                        console.log(err);
                        result.otherError = true;
                        result.data = err;
                        res.send(result);

                    }
                    else {
                        dbConnection.query(tableData[recordType].recordQueryString, data[keyField], (errors, results, fields) => {
                            if (errors) {
                                console.log(errors);
                                result.otherError = true;
                                result.data = errors;
                                res.send(result);
                            }
                            else {
                                console.log(results[0]);
                                result.data = results[0];

                                res.send(result);

                            }
                        });
                    }
                });
            }
            else {
                result.noChange = true;
                res.send(result);
            }
        });
    }
      

    }
});


detectChanges = (existingRecord, updatedRecord) => {

    changesFound = false;

    changedFieldValues = {};
    queryString = '';
    for (let prop in updatedRecord) {
        if (Object.prototype.hasOwnProperty.call(updatedRecord, prop)) {
            if (!existingRecord && updatedRecord[prop] != '' || existingRecord &&  existingRecord[prop] != updatedRecord[prop]) {
                changesFound = true;
                changedFieldValues[prop] = updatedRecord[prop];
            }

        }

    }
   

   return [changesFound, changedFieldValues]





}

app.delete("/data/employers", (req, res) => {
    let keyField;
    
    if (!req.query['record_type'] || !req.query['record_id']) {
        sendErrorResponse(res,'Required parameters were not supplied.');   
     
    
    }
    
    else if (tableData[req.query['record_type']] == null || (keyField = tableData[req.query['record_type']]['keyField']) == null)
    {
    
       sendErrorResponse(res,'Record type specified is not valid for this operation.');
    
    }
    
    else
     {
        
        dbConnection.query('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [req.query['record_type'], keyField, req.query['record_id']], (error, update_result) => {
        
            if (error) {
            sendErrorResponse(res, error.message);
        }
        else
        {
            res.send({
                message: 'Request has been processed'
            });
        
        }
        
    
        });
    }
    
    });
    
    
    app.get('/data/graduateSchools/search', (req, res) => {
        let baseQuery = 'SELECT graduate_school_id, school_name, city, state FROM graduate_schools WHERE deleted = 0'
        let [criteria, propValues] = getQueryValues(req.query, 'graduate_schools');
    
        criteria += ' ORDER BY school_name, state, city';
        criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage);
        dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
            if (!error) {
                res.send(results);
            }
            else {
                console.log(error);
                    sendErrorResponse(res,error.message);
            }
        });
    
    });
    
    
    
    app.get('/data/graduateSchools/search/pageCount', (req, res) => {
        let baseQuery = 'SELECT COUNT(DISTINCT graduate_school_id) ItemCount FROM graduate_schools WHERE deleted = 0'
    
        let [criteria, propValues] = getQueryValues(req.query, 'graduate_schools');
      
    
        dbConnection.query(baseQuery + criteria, propValues, (error, results, fields) => {
            if (!error) {
                console.log(results);
                res.send({ pageCount: Math.ceil(results[0].ItemCount / (req.query.itemsPerPage == undefined ? DEFAULT_PAGE_SIZE : req.query.itemsPerPage)) });
            }
            else {
                sendErrorResponse(res,error.message);
            }
        });
    
    });
    
    app.get('/data/graduateSchools/byid/:id', (req, res) => {
    
        let result = {
            graduateSchool: null,
            comments: null
            
    
        };
    
    
    
    
        let query = 'SELECT * FROM graduate_schools WHERE graduate_school_id = ?';
    
        dbConnection.query(query, req.params['id'], (error, results, fields) => {
            if (!error) {
                result.graduateSchool = results[0];
    
    
                                        query = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'G\' AND entity_id = ? AND deleted = 0';
                                        dbConnection.query(query, req.params['id'], (error, results, fields) => {
                                            if (!error) {
                                                result.comments = results;
                                                res.send(result);
                                            }
                                            else {   
                                                sendErrorResponse(res,error.message);
                                            }
                                        });
            }
            else {
                sendErrorResponse(res,error.message);
            }
    
        });
    
    
    
    });
    
    
    
    app.get("/data/graduateSchools/childData", (req, res) => {
    
        result = {
            data: null
        }
    
    
    
        selectString: String;
        
        if (!tableData[req.query['record_type']]) {
           sendErrorResponse(res,'Record type specified is not valid for this operation.');
            return;
        }
        
        dbConnection.query(tableData[req.query['record_type']].recordQueryString,req.query['record_id'], (error, results, fields) => {
            if (error) {
                sendErrorResponse(res,error.message);
            }
            else {
                result.data = results[0];
                res.send(result);
            }
    
        });
    
    });
    
    
    
    
    app.post("/data/graduateSchools", (req, res) => {
        result = {
            validationError: false,
            otherError: false,
            noChange: false,
            data: null
        }
        graduateSchoolData = req.body;
        
        if (!graduateSchoolData['recordType'] || !tableData[graduateSchoolData['recordType']]) {
            result.otherError = true;
            result.data = 'Record type is missing or invalid.';
            
            res.send(result);
        }
        else {
        let recordType = graduateSchoolData['recordType'];
        let keyField = tableData[graduateSchoolData['recordType']].keyField;
        let data = graduateSchoolData['data'];
        const validator = new graduateSchoolValidator();
        let errorsExist;
        let errors;
    
    
        if (recordType == 'graduate_school') {
            [errorsExist, errors] = validator.validateemployerRecord(data);
        }
        else {
         [errorsExist, errors] = validator.validateChildRecord(recordType, data);
        }
    
    
        if (errorsExist) {
            result.validationError = true;
            result.data = errors;
            console.log(result);
            res.send(result);
        }
        else {
         
            let [changesFound, newData] = detectChanges(null, data);
            newData['added_by'] = newData['updated_by'] = 'CURRENTUSER';
            
            
            dbConnection.query('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', [recordType, newData], (errors, results, fields) => {
                
                dbConnection.query(tableData[recordType].recordQueryString, results.insertId, (errors, results, fields) => {
                    console.log(errors);
                    console.log(results);
                    result.data = results;
                    res.send(result);
                          
        
                });
    
            });
    
        }   
    
        }
    });
    
    
    app.put("/data/graduateSchools", (req, res) => {
        result = {
            validationError: false,
            otherError: false,
            noChange: false,
            data: null
        }
        graduateSchoolData = req.body;
        console.log(graduateSchoolData);
        if (!graduateSchoolData['recordType'] || !tableData[graduateSchoolData['recordType']]) {
            result.otherError = true;
            result.data = 'Record type is missing or invalid.';
            res.send(result);
        }
        else {
        let recordType = graduateSchoolData['recordType'];
        let keyField = tableData[graduateSchoolData['recordType']].keyField;
        let data = graduateSchoolData['data'];
        const validator = new graduateSchoolValidator();
        let errorsExist;
        let errors;
    
    
        if (recordType == 'graduate_school') {
    
            [errorsExist, errors] = validator.validateGraduateSchoolRecord(data);
        }
        else {
         [errorsExist, errors] = validator.validateChildRecord(recordType, data);
        }
    
        if (errorsExist) {
            result.validationError = true;
            result.data = errors;
            res.send(result);
        }
        else {
         
            dbConnection.query(tableData[recordType].recordQueryString, data[keyField], (errors, results, fields) => {
            
    
                let [changesFound, changedFieldValues] = detectChanges(results[0], data);
              
                if (changesFound) {
                   // changedFieldValues[keyField] = data[keyField];
                console.log(keyField);
                   changedFieldValues['updated_by'] = 'CURRENTUSER';
                    dbConnection.query('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', [recordType, changedFieldValues, keyField, data[keyField]],
                     (err, update_result) => {
                        if (err) {
                            console.log(err);
                            result.otherError = true;
                            result.data = err;
                            res.send(result);
    
                        }
                        else {
                            dbConnection.query(tableData[recordType].recordQueryString, data[keyField], (errors, results, fields) => {
                                if (errors) {
                                    console.log(errors);
                                    result.otherError = true;
                                    result.data = errors;
                                    res.send(result);
                                }
                                else {
                                    console.log(results[0]);
                                    result.data = results[0];
    
                                    res.send(result);
    
                                }
                            });
                        }
                    });
                }
                else {
                    result.noChange = true;
                    res.send(result);
                }
            });
        }
          
    
        }
    });
    
    
    detectChanges = (existingRecord, updatedRecord) => {
    
        changesFound = false;
    
        changedFieldValues = {};
        queryString = '';
        for (let prop in updatedRecord) {
            if (Object.prototype.hasOwnProperty.call(updatedRecord, prop)) {
                if (!existingRecord && updatedRecord[prop] != '' || existingRecord &&  existingRecord[prop] != updatedRecord[prop]) {
                    changesFound = true;
                    changedFieldValues[prop] = updatedRecord[prop];
                }
    
            }
    
        }
       
    
       return [changesFound, changedFieldValues]
    
    
    
    
    
    }
    
    app.delete("/data/graduateSchools", (req, res) => {
        let keyField;
        
        if (!req.query['record_type'] || !req.query['record_id']) {
            sendErrorResponse(res,'Required parameters were not supplied.');   
         
        
        }
        
        else if (tableData[req.query['record_type']] == null || (keyField = tableData[req.query['record_type']]['keyField']) == null)
        {
        
           sendErrorResponse(res,'Record type specified is not valid for this operation.');
        
        }
        
        else
         {
            
            dbConnection.query('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [req.query['record_type'], keyField, req.query['record_id']], (error, update_result) => {
            
                if (error) {
                sendErrorResponse(res, error.message);
            }
            else
            {
                res.send({
                    message: 'Request has been processed'
                });
            
            }
            
        
            });
        }
        
        });
        
        
    





app.get("/data/graduate-schools/selectionList", (req, res) => {
    let query = "SELECT graduate_school_id value, CASE WHEN city IS NULL THEN school_name ELSE CONCAT(school_name," +
    "', ',city ,', ',state) END text from graduate_schools WHERE deleted = 0 ORDER BY school_name, state, city";

    dbConnection.query(query, (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            sendErrorResponse(res,error.message);
        }
    });
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
    console.log(queryValues);
    let criteria = '';
    let propValues = [];
    for (let propName in queryValues) {
        
        let specialQuery = specialQueryStrings[entityName][propName];
        if (queryValues.hasOwnProperty(propName) && propName != 'page' && propName != 'itemsPerPage') {
          if  (specialQuery == undefined || specialQuery.includeParameter) {
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
        }
            if (specialQueryStrings[entityName][propName] == undefined) {
                if (queryValues[propName].search(/\%/g) == -1) {
                criteria += ' AND ' + propName + ' = ?';
                }
                else 
                {
                criteria += ' AND ' + propName + ' LIKE ?';
                }
            }
            else {
                criteria += ' AND ' + specialQueryStrings[entityName][propName].queryString;
            }
        }
    }
    console.log(criteria, propValues);
    return [criteria, propValues];

};

const specialQueryStrings = {

    alumni: {
        employer: {
            includeParameter: boolean = true,
          queryString: string =  "alumni.alumnus_id IN (SELECT alumnus_id from alumni_employments WHERE employer_id = ? AND active = 1 and deleted = 0)"
        },
        graduateSchool:
    {
            includeParameter:boolean = true,
         queryString: string = "alumni.alumnus_id IN (SELECT alumnus_id from alumni_graduate_schools WHERE graduate_school_id = ? and deleted = 0)",
        },
        noEmployer: {
            includeParameter: boolean = false,
            queryString: string = "alumni_employments.employer_id IS NULL"
        },
        noGraduateSchool: {
            includeParameter: boolean = false,
            queryString: string = "alumni_graduate_schools.graduate_school_id IS NULL"
        }       
        
    },
    employers: {

    },
    graduate_schools: {

    }

}

const tableData = {
    alumni: {
        keyField: string = 'alumnus_id',
        recordQueryString: string = 'SELECT * FROM alumni WHERE alumnus_id = ?'
        
    },
    alumni_degrees: {
        keyField: string = 'degree_id',
        recordQueryString: string = 'SELECT alumnus_id, degree_id, diploma_description, graduation_term_code, added_by, added_datetime, updated_by, updated_datetime' +
        ' FROM alumni_degrees WHERE degree_id = ?'
      
    },
    alumni_employments: {
        keyField: string = 'employment_id',
        recordQueryString: string = 'SELECT alumnus_id, employment_id, employers.employer_id, employer_name, city, state, job_title, active,  alumni_employments.added_by, alumni_employments.added_datetime,' +
        ' alumni_employments.updated_by, alumni_employments.updated_datetime FROM alumni_employments INNER JOIN employers ON alumni_employments.employer_id' +
        ' = employers.employer_id WHERE employment_id = ?'
    },
    alumni_graduate_schools: {
        keyField: string = 'alumni_graduate_school_id',
        recordQueryString: string = 'SELECT alumnus_id, alumni_graduate_school_id, graduate_schools.graduate_school_id, school_name, city, state, alumni_graduate_schools.added_by, alumni_graduate_schools.added_datetime,' +
        ' alumni_graduate_schools.updated_by, alumni_graduate_schools.updated_datetime FROM alumni_graduate_schools INNER JOIN graduate_schools ON graduate_schools.graduate_school_id' +
        ' = alumni_graduate_schools.graduate_school_id WHERE alumni_graduate_school_id = ?'
    
    },
    comments: {
        keyField: string = 'comment_id',
        recordQueryString: string = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE comment_id = ?' 
    },

    employers: {
        keyField: string = 'employer_id',
        recordQueryString: string = 'SELECT * FROM employers WHERE employer_id = ?'
    },
    graduate_schools: {
        keyField: string = "graduate_school_id",
        recordQueryString: string = 'SELECT * from graduate_schools WHERE graduate_school_id = ?'
    }

}

const sendErrorResponse = function(res, error) {
    res.status(400).send('The request could not be processed.  Reason: ' + error);
};


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