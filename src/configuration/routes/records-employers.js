
const employersValidator = require('../../validations/employers');
const common = require('./common');

module.exports = function (app) {





    app.get('/data/employers/selectionList', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        let query = "SELECT employer_id value, CASE WHEN city IS NULL THEN employer_name ELSE CONCAT(employer_name," +
        "', ',city ,', ',state) END text from employers WHERE deleted = 0 ORDER BY employer_name, state, city";
       

            common.database.executeQuery(query).then(result => res.send(result)).
            catch(error => common.sendErrorResponse(res,400, error.message));
        



    });




    app.get('/data/employers/search', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        let baseQuery = 'SELECT employer_id, employer_name, city, state FROM employers WHERE deleted = 0'
        let [criteria, propValues] = common.getQueryValues(req.query, 'employers');

        criteria += ' ORDER BY employer_name, state, city';
        criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage);
       
       
        common.database.executeQuery(baseQuery + criteria, propValues).then(result => res.send(result)).
        catch(error => common.sendErrorResponse(res,400, error.message));
    


    });



    app.get('/data/employers/search/pageCount', (req, res) => {

        if (req.user == null) {
             common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
             return;
        }


        let baseQuery = 'SELECT COUNT(DISTINCT employer_id) ItemCount FROM employers WHERE deleted = 0'

        let [criteria, propValues] = getQueryValues(req.query, 'employers');

        common.database.executeQuery(baseQuery + criteria, propValues).then(result => res.send({ pageCount: Math.ceil(result[0].ItemCount / (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage)) })).
        catch(error => common.sendErrorResponse(res,400, error.message));
    
    });

    app.get('/data/employers/byid/:id', (req, res) => {

        if (req.user == null) {
             common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
             return;
        }


        let result = {
            employer: null,
            comments: null


        };


        let query = 'SELECT * FROM employers WHERE employer_id = ?';





        common.database.executeQuery(query, req.params['id']).then(results => {

            result.employer = results[0];

            query = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'E\' AND entity_id = ? AND deleted = 0';
          
            common.database.executeQuery(query, req.params['id']).then(results => {
                result.comments = results;
                res.send(result);

            }).catch(error => common.sendErrorResponse(res,400, error.message));

        }).catch(error => common.sendErrorResponse(res,400, error.message));


               


    });



    app.get('/data/employers/childData', (req, res) => {

        if (req.user == null) {
             common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
             return;
        }
        
        result = {
            data: null
        }



        selectString: String;

        if (!common.tableData[req.query['record_type']]) {
            common.sendErrorResponse(res, 400, 'Record type specified is not valid for this operation.');
            return;
        }

        common.database.executeQuery(common.tableData[req.query['record_type']].recordQueryString, req.query['record_id']).then(results => {
            result.data = results[0];
            res.send(result);
        }).catch(error => common.specialQueryStringssendErrorResponse(res,400,error.message));

        

    });




    app.post('/data/employers', (req, res) => {


        if (req.user == null) {
             common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
             return;
        }

        result = {
            validationError: false,
            otherError: false,
            noChange: false,
            data: null
        }
        employerData = req.body;

        if (!employerData['recordType'] || !common.tableData[employerData['recordType']]) {
            result.otherError = true;
            result.data = 'Record type is missing or invalid.';
            res.send(result);
        }
        else {
            let recordType = employerData['recordType'];
            let data = employerData['data'];
            const validator = new employersValidator();
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
                res.send(result);
            }
            else {

                let [changesFound, newData] = common.detectChanges(null, data);
                newData['added_by'] = newData['updated_by'] = 'CURRENTUSER';

                common.database.executeQuery('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', [recordType, newData]).then(result => {

                    common.database.executeQuery(common.tableData[recordType].recordQueryString, result.insertId).then(results => {
                        result.data = results;
                        res.send(result);
                    }).catch(error => { 
                        result.otherError = true;
                        result.data = error;
                        res.send(result);
                    });



                }).catch(error => { 
                    result.otherError = true;
                    result.data = error;
                    res.send(result);
                });
            }
        }

              
    });


    app.put('/data/employers', (req, res) => {

        if (req.user == null) {
             common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
             return;
        }


        result = {
            validationError: false,
            otherError: false,
            noChange: false,
            data: null
        }
        employerData = req.body;
    
        if (!employerData['recordType'] || !common.tableData[employerData['recordType']]) {
            result.otherError = true;
            result.data = 'Record type is missing or invalid.';
            res.send(result);
        }
        else {
            let recordType = employerData['recordType'];
            let keyField = common.tableData[employerData['recordType']].keyField;
            let data = employerData['data'];
            const validator = new employersValidator();
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


                common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {


                    let [changesFound, changedFieldValues] = common.detectChanges(results[0], data);

                    if (changesFound) {
                     
                        changedFieldValues['updated_by'] = 'CURRENTUSER';
                        common.database.executeQuery('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', [recordType, changedFieldValues, keyField, data[keyField]])
                            .then(result => {
                                
                                    common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {
                                       
                                            
                                            result.data = results[0];

                                            res.send(result);

                                        
                                    }).catch(error => { 
                                        result.otherError = true;
                                        result.data = error;
                                        res.send(result);
                                    });
                                
                            }).catch(error => { result.otherError = true;
                                result.data = error;
                                res.send(result);
                            });
                    }
                    else {
                        result.noChange = true;
                        res.send(result);
                    }
                }).catch(error => { 
                    result.otherError = true;
                    result.data = error;
                    res.send(result);
                });
            }


        }
    });



    app.delete('/data/employers', (req, res) => {
        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }


        let keyField;

        if (!req.query['record_type'] || !req.query['record_id']) {
            common.sendErrorResponse(res, 400, 'Required parameters were not supplied.');


        }

        else if (common.tableData[req.query['record_type']] == null || (keyField = common.tableData[req.query['record_type']]['keyField']) == null) {

            common.sendErrorResponse(res, 400, 'Record type specified is not valid for this operation.');

        }

        else {

            common.database.executeQuery('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [req.query['record_type'], keyField, req.query['record_id']]).then(result => {

                
                    res.send({
                        message: 'Request has been processed'
                    });

                


            }).catch(error => { 
                common.sendErrorResponse(res, 400, error.message);

            });
        }

    });








}



