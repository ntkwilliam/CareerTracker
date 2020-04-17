const alumniValidator = require('../../validations/alumni');
const common = require('./common');



module.exports = function (app) {






    app.get('/data/alumni/search', (req, res) => {
   
        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }
        let baseQuery = 'SELECT alumni.alumnus_id, last_name, first_name, middle_name, CONCAT(mailing_address_city,\', \', mailing_address_state) location, GROUP_CONCAT(DISTINCT graduation_term_code SEPARATOR \', \')' +
            ' graduation_term_codes, GROUP_CONCAT(DISTINCT employer_name SEPARATOR \', \') employers, GROUP_CONCAT(DISTINCT school_name SEPARATOR \', \') graduate_schools' +
            ' FROM alumni LEFT JOIN alumni_employments on alumni_employments.alumnus_id = alumni.alumnus_id AND alumni_employments.active = 1 AND alumni_employments.deleted = 0' +
            ' LEFT JOIN employers ON alumni_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN alumni_degrees' +
            ' ON alumni_degrees.alumnus_id = alumni.alumnus_id AND alumni_degrees.deleted = 0 LEFT JOIN alumni_graduate_schools ON alumni_graduate_schools.alumnus_id' +
            ' = alumni.alumnus_id AND alumni_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON alumni_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
            ' AND graduate_schools.deleted = 0 WHERE alumni.deleted = 0'
        let [criteria, propValues] = common.getQueryValues(req.query, 'alumni');

        criteria += ' GROUP BY alumni.alumnus_id, last_name, first_name, middle_name, mailing_address_city, mailing_address_state'
        criteria += ' ORDER BY last_name, first_name, middle_name';
        criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage);

        common.database.executeQuery(baseQuery + criteria, propValues).then(result => {
            res.send(result);

        }).catch(error => {
            common.sendErrorResponse(res, 400, error.message);
        })



    });

    app.get('/data/alumni/search/pageCount', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }


        let baseQuery = 'SELECT COUNT(DISTINCT alumni.alumnus_id) ItemCount FROM alumni LEFT JOIN alumni_employments on alumni_employments.alumnus_id = alumni.alumnus_id AND alumni_employments.active = 1 AND alumni_employments.deleted = 0' +
            ' LEFT JOIN employers ON alumni_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN alumni_degrees' +
            ' ON alumni_degrees.alumnus_id = alumni.alumnus_id AND alumni_degrees.deleted = 0 LEFT JOIN alumni_graduate_schools ON alumni_graduate_schools.alumnus_id' +
            ' = alumni.alumnus_id AND alumni_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON alumni_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
            ' WHERE alumni.deleted = 0'

        let [criteria, propValues] = common.getQueryValues(req.query, 'alumni');
        
        common.database.executeQuery(baseQuery + criteria, propValues).then(result => {
            res.send({ pageCount: Math.ceil(result[0].ItemCount / (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage)) });

        }).catch(error => {
            common.sendErrorResponse(res, 400, error.message);
        });



    });






    app.get('/data/alumni/byid/:id', (req, res) => {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        let result = {
            alumni: null,
            alumni_employments: null,
            graduateSchools: null,
            alumni_degrees: null,
            comments: null,


        };
        let query = 'SELECT * FROM alumni WHERE alumnus_id = ?';



        common.database.executeQuery(query, req.params['id']).then(results => {
            result.alumni = results[0];
            
            let employmentsPromise = common.database.executeQuery('SELECT employment_id, employers.employer_id, employer_name, city, state, job_title, active,  alumni_employments.added_by, alumni_employments.added_datetime,' +
                ' alumni_employments.updated_by, alumni_employments.updated_datetime FROM alumni_employments INNER JOIN employers ON alumni_employments.employer_id' +
                ' = employers.employer_id WHERE alumnus_id = ? AND alumni_employments.deleted = 0', req.params['id']);

            let degreesPromise = common.database.executeQuery('SELECT degree_id, diploma_description, graduation_term_code, added_by, added_datetime, updated_by, updated_datetime' +
                ' FROM alumni_degrees WHERE alumnus_id = ? AND deleted = 0', req.params['id']);

            let graduateSchoolsPromise = common.database.executeQuery('SELECT alumnus_id, alumni_graduate_school_id, graduate_schools.graduate_school_id, school_name, city, state, alumni_graduate_schools.added_by, alumni_graduate_schools.added_datetime,' +
                ' alumni_graduate_schools.updated_by, alumni_graduate_schools.updated_datetime FROM alumni_graduate_schools INNER JOIN graduate_schools ON graduate_schools.graduate_school_id' +
                ' = alumni_graduate_schools.graduate_school_id WHERE alumnus_id = ? AND alumni_graduate_schools.deleted = 0', req.params['id']);

            let commentsPromise = common.database.executeQuery('SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'A\' AND entity_id = ? AND deleted = 0',req.params['id']);

            Promise.all([employmentsPromise, degreesPromise, graduateSchoolsPromise, commentsPromise]).then(results => {
            result.alumni_employments = results[0];
            result.alumni_degrees = results[1];
            result.graduateSchools = results[2];
            result.comments = results[3];
          
            res.send(result);   
            }).catch(error => {
              
                common.sendErrorResponse(res, 400, error.message)
            });



        }).catch(error => common.sendErrorResponse(res, 400, error.message));


    });





    app.get('/data/alumni/childData', (req, res) => {


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


        common.database.executeQuery(common.tableData[req.query['record_type']].recordQueryString, req.query['record_id'])
            .then(results => {
                result.data = results[0];
                res.send(result);
            }).catch(error => common.sendErrorResponse(res, 400, error.message));


    });




    app.delete('/data/alumni', (req, res) => {

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


            common.database.executeQuery('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [req.query['record_type'], keyField, req.query['record_id']])
                .then(result => res.send(null)).
                catch(error => common.sendErrorResponse(res, 400, error.message));





        }

    });



    app.post('/data/alumni', (req, res) => {
        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }


        result = {
            validationError: false,
            otherError: false,
            noChange: false,
            data: null
        };
        alumniData = req.body;
  
        if (!alumniData['recordType'] || !common.tableData[alumniData['recordType']]) {
            common.sendErrorResponse(res, 400, 'The record type specified is not valid for this operation.');

        }
        else {
            let recordType = alumniData['recordType'];
         
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
              
                let [changesFound, newData]= common.detectChanges(null, data);
                newData['added_by'] = newData['updated_by'] = req.user.username;
              

                common.database.executeQuery('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', [recordType, newData]).then(results => {

                    common.database.executeQuery(common.tableData[recordType].recordQueryString, results.insertId).then(results => {

                        result.data = results;
                        res.send(result);

                    }).catch(error => common.sendErrorResponse(res, 400, error.message));


                }).catch(error => common.sendErrorResponse(res, 400, error.message));
            }
        }

    });


    app.put('/data/alumni', (req, res) => {

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

        let alumniData = req.body;
        

        if (!alumniData['recordType'] || !common.tableData[alumniData['recordType']]) {
            return common.sendErrorResponse(res, 400, 'The record type specified is not valid for this operation.');
        }
        else {
            let recordType = alumniData['recordType'];
            let keyField = common.tableData[alumniData['recordType']].keyField;
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
                common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {
                    let [changesFound, changedFieldValues] = common.detectChanges(results[0], data);


                    if (changesFound) {
                        changedFieldValues['updated_by'] = req.user.username;
                     
                        common.database.executeQuery('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', [recordType, changedFieldValues, keyField, data[keyField]])
                            .then(results => {
                                
                                    common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {
                                        result.data = results[0];
                                   
                                        res.send(result);
                                    }).catch(error => {

                                        
                                        error => common.sendErrorResponse(res, 400, error.message)
                                    });
                              





                            }).catch(error => common.sendErrorResponse(res, 400, error.message));
                    }


                    else {
                        result.noChange = true;
                        res.send(result);
                    }
                }).catch(error => common.sendErrorResponse(res, 400, error.message));

            }

        }



    });



}