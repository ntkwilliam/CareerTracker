const employersValidator = require('../validations/alumni');



module.exports = function(app, changeDetector) {





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
    







}



