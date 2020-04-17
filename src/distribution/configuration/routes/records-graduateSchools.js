const common = require('./common');
const graduateSchoolsValidator = require('../../validations/graduateSchools');
module.exports = function (app) {




    app.get('/data/graduateSchools/search', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        let baseQuery = 'SELECT graduate_school_id, school_name, city, state, contact_name FROM graduate_schools WHERE deleted = 0'
        let [criteria, propValues] = getQueryValues(req.query, 'graduate_schools');

        criteria += ' ORDER BY school_name, state, city';
        criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage);
  
       
        common.database.executeQuery(baseQuery + criteria, propValues).then(result => {
            
                res.send(result);
 
        }).catch(error => common.sendErrorResponse(res, 400, error.message));

    });



    app.get('/data/graduateSchools/search/pageCount', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }


        let baseQuery = 'SELECT COUNT(DISTINCT graduate_school_id) ItemCount FROM graduate_schools WHERE deleted = 0'

        let [criteria, propValues] = getQueryValues(req.query, 'graduate_schools');


        common.database.executeQuery(baseQuery + criteria, propValues).then(result => {
            
                res.send({ pageCount: Math.ceil(result[0].ItemCount / (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage)) });
            
            
        }).catch(error => common.sendErrorResponse(res, 400, error.message));

    });

    app.get('/data/graduateSchools/byid/:id', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        let result = {
            graduateSchool: null,
            comments: null


        };




        let query = 'SELECT * FROM graduate_schools WHERE graduate_school_id = ?';

        common.database.executeQuery(query, req.params['id']).then( results => {
            
                result.graduateSchool = results[0];


                query = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'G\' AND entity_id = ? AND deleted = 0';
                common.database.executeQuery(query, req.params['id']).then(results => {
                   
                        result.comments = results;
                        res.send(result);
                   
                   
                }).catch(error => common.sendErrorResponse(res, 400, error.message));
            

        }).catch(error => common.sendErrorResponse(res,400,error.message));



    });



    app.get('/data/graduateSchools/childData', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        result = {
            data: null
        }



        if (!common.tableData[req.query['record_type']]) {
            common.sendErrorResponse(res, 400, 'Record type specified is not valid for this operation.');
            return;
        }

        common.database.executeQuery(common.tableData[req.query['record_type']].recordQueryString, req.query['record_id']).then(results => {
            
                result.data = results[0];
                res.send(result);
            

        }).catch(error => common.sendErrorResponse(res, 400, error.message));

    });




    app.post('/data/graduateSchools', (req, res) => {

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
        graduateSchoolData = req.body;
     

        if (!graduateSchoolData['recordType'] || !common.tableData[graduateSchoolData['recordType']]) {
            result.otherError = true;
            result.data = 'Record type is missing or invalid.';

            res.send(result);
        }
        else {
            let recordType = graduateSchoolData['recordType'];
         
            let data = graduateSchoolData['data'];
            const validator = new graduateSchoolsValidator();
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
                res.send(result);
            }
            else {

                let [changesFound, newData] = common.detectChanges(null, data);
                newData['added_by'] = newData['updated_by'] = req.user.username;


                common.database.executeQuery('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', [recordType, newData]).then(result => {

                    common.database.executeQuery(common.tableData[recordType].recordQueryString, result.insertId).then(results => {
                        
                        result.data = results;
                        res.send(result);


                    }).catch(errors => { 
                        
                        result.otherError = true;
                        result.data = error;
                        res.send(result);
                    });

                }).catch(error =>
                    {
                        
                        result.otherError = true;
                        result.data = error;
                        res.send(result);
                    });

            }

        }
    });


    app.put('/data/graduateSchools', (req, res) => {

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
        graduateSchoolData = req.body;
      
        if (!graduateSchoolData['recordType'] || !common.tableData[graduateSchoolData['recordType']]) {
            result.otherError = true;
            result.data = 'Record type is missing or invalid.';
            res.send(result);
        }
        else {
            let recordType = graduateSchoolData['recordType'];
            let keyField = common.tableData[graduateSchoolData['recordType']].keyField;
            let data = graduateSchoolData['data'];
            const validator = new graduateSchoolsValidator();
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

                common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {


                    let [changesFound, changedFieldValues] = common.detectChanges(results[0], data);

                    if (changesFound) {

                        changedFieldValues['updated_by'] = req.user.username;
                        common.database.executeQuery('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', [recordType, changedFieldValues, keyField, data[keyField]]).then(
                            result => {

                                    common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {
              

                                            result.data = results[0];

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
                    else {
                        result.noChange = true;
                        res.send(result);
                    }
                }).catch(error => { 
                                
                    result.otherError = true;
                    result.data = error;
                    res.send(result);
                });;
            }


        }
    });



    app.delete('/data/graduateSchools', (req, res) => {



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

            common.database.executeQuery('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [req.query['record_type'], keyField, req.query['record_id']]).then( result => {

                    res.send({
                        message: 'Request has been processed'
                    });

                


            }).catch(error => { 
                    common.sendErrorResponse(res, 400, error.message);

            });
        }

    });








    app.get('/data/graduate-schools/selectionList', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        let query = "SELECT graduate_school_id value, CASE WHEN city IS NULL THEN school_name ELSE CONCAT(school_name," +
        "', ',city ,', ',state) END text from graduate_schools WHERE deleted = 0 ORDER BY school_name, state, city";
        

        common.database.executeQuery(query).then(result => {
           res.send(result);
            
        }).catch(error => common.sendErrorResponse(res,400,error.message));
    });


















}