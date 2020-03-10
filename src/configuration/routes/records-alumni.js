const alumniValidator = require('../validations/alumni');




modules.exports = function (app, changeDetector) {


    



    app.get('/data/alumni/search', (req, res) => {
        if (req.user == null) {
            res.send('Unauthorized');
            return;
        }
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
         
            let [changesFound, newData] = changeDetector(null, data);
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
            
    
                let [changesFound, changedFieldValues] = changeDetector(results[0], data);
    
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




    
}