
var errorExpected = false;
let common  = {
    getQueryValues:  function (values) {
        return values;
    },

    getQueryResponse: function (value)
     { return value},

   
    database: {
        executeQuery: function(query, data) {
           
            return new Promise((resolve, reject) => { 
                if (errorExpected) {
                    reject('failed');
                }
                else {
                    resolve('success');
                }


            });
    
            
        } 
    },
    tableData: require('../configuration/routes/common').tableData,
    sendErrorResponse: function(val, val,  errorMessage) {
        return errorMessage;
    }
}








var assert = require('assert');



let user = {
    username: 'test'
}

describe('Testing - Alumnus records', function() {



it('appGetAlumniSearch - user null', async function() {


  
  
   let testResult = await appGetAlumniSearch(
       {
           user: null
       }, 
       null
   );

    assert.equal(testResult, 'Unauthorized use not permitted');
    
});





});

describe('Testing - Alumnus records', function() {

it('appGetAlumniSearch - user not null - successful search',  async function() {


  
  
    let testResult = await appGetAlumniSearch(
            {
                user: 'Scott',
                page: 1
            },
               null
        );
        
    
    assert.equal(testResult, 'success');
    
 
 
 
 
 
 });
 
});


describe('Testing - Alumnus records', function() {
 it('appGetAlumniSearch - user not null - unsuccessful search', async function() {


  
  
        errorExpected = true;
        let testResult = await appGetAlumniSearch(
            {
                user: 'Scott',
                query: {
                    page: 1
                }
            }, 
            null
        );
        assert.equal(testResult, 'failed');

    
    
 
 
 
 
 
 });
 
});
 

describe('Testing - Alumnus records', function() {
 it('appGetDataAlumniByID - user null', async function() {


  
  
        errorExpected = true;
        let testResult = await appGetDataAlumniByID(
            {
                user: null,
                query: {
                    page: 1
                }
            }, 
            null
        );
        assert.equal(testResult, 'Unauthorized use not permitted');

    
 
 
 
 });
 
});


describe('Testing - Alumnus records', function() {
 it('appGetDataAlumniByID - user not null - unsuccessful', async function() {


  
  
        errorExpected = true;
        let testResult = await appGetDataAlumniByID(
            {
                user: 'Scott',
                query: {
                    page: 1,
                    id: 1
                },
                params: {
                    id: 1
                }
                
            }, 
            null
        );
        assert.equal(testResult, 'failed');

    
    
 
 
 });

});



describe('Testing - Alumnus records', function() {
 it('appGetDataAlumniByID - user not null - successful', async function() {


  
  
        errorExpected = false;
        let testResult = await appGetDataAlumniByID(
            {
                user: 'Scott',
                query: {
                    page: 1
                },
                params: {
                    id: 1
                }
            }, 
            null
        );
        assert.equal(testResult.alumni, 'success');
        assert.equal(testResult.alumni_degrees, 'success');
        assert.equal(testResult.alumni_employments, 'success');
        assert.equal(testResult.comments, 'success');
        assert.equal(testResult.graduateSchools, 'success');


        });
    });
    
    describe('Testing - Alumnus records', function() {
        it('appGetPageCount - user null', async function() {
       
       
         
         
               errorExpected = false;
               let testResult = await appGetPageCount(
                   {
                       user: null,
                       query: {
                           page: 1
                       },
                       params: {
                           id: 1 
                       }
                   }, 
                   null
               );
               
               
               assert.equal(testResult, 'Unauthorized use not permitted');
            });
           });
 

    describe('Testing - Alumnus records', function() {
        it('appGetPageCount - user not null - successful', async function() {
       
       
         
         
               errorExpected = false;
               let testResult = await appGetPageCount(
                   {
                       user: 'Scott',
                       query: {
                           page: 1
                       },
                       params: {
                           id: 1 
                       }
                   }, 
                   null
               );
               
               
               assert.equal(testResult, 'success');
            });
           });

           describe('Testing - Alumnus records', function() {
            it('appGetPageCount - user not null - unsuccessful', async function() {
           
           
             
             
                   errorExpected = true;
                   let testResult = await appGetPageCount(
                       {
                           user: 'Scott',
                           query: {
                               page: 1
                           },
                           params: {
                               id: 1 
                           }
                       }, 
                       null
                   );
                   
                   
                   assert.equal(testResult, 'failed');
                });
               });
        

               describe('Testing - Alumnus records', function() {
                it('appGetDataAlumniChildData - user null', async function() {
               
               
                 
                 
                       errorExpected = false;
                       let testResult = await appGetDataAlumniChildData(
                           {
                               user: null,
                               query: {
                                   page: 1
                               },
                               params: {
                                   id: 1 
                               }
                           }, 
                           null
                       );
                       
                       
                       assert.equal(testResult, 'Unauthorized use not permitted');
                    });
                   });
         
        
            describe('Testing - Alumnus records', function() {
                it('appGetDataAlumniChildData - user not null - successful', async function() {
               
               
                 
                 
                       errorExpected = false;
                       let testResult = await appGetDataAlumniChildData(
                           {
                               user: 'Scott',
                               query: {
                                   page: 1,
                                   record_type: 'alumni'
                               },
                               params: {
                                   id: 1 
                               }
                           }, 
                           null
                       );
                       
                       
                       assert.equal(testResult, 'success');
                    });
                   });
        
                   describe('Testing - Alumnus records', function() {
                    it('appGetDataAlumniChildData - user not null - unsuccessful', async function() {
                   
                   
                     
                     
                           errorExpected = true;
                           let testResult = await appGetDataAlumniChildData(
                               {
                                   user: 'Scott',
                                   query: {
                                       page: 1,
                                       record_type: 'alumni'
                                   },
                                   params: {
                                       id: 1 
                                   }
                               }, 
                               null
                           );
                           
                           
                           assert.equal(testResult, 'failed');
                        });
                       });
                
        
                       describe('Testing - Alumnus records', function() {
                        it('appDeleteDataAlumni - user null', async function() {
                       
                       
                         
                         
                               errorExpected = false;
                               let testResult = await appDeleteDataAlumni(
                                   {
                                       user: null,
                                       query: {
                                           page: 1
                                       },
                                       params: {
                                           id: 1 
                                       }
                                   }, 
                                   null
                               );
                               
                               
                               assert.equal(testResult, 'Unauthorized use not permitted');
                            });
                           });
                 
                
                    describe('Testing - Alumnus records', function() {
                        it('appDeleteDataAlumni - user not null - successful', async function() {
                       
                       
                         
                         
                               errorExpected = false;
                               let testResult = await appDeleteDataAlumni(
                                   {
                                       user: 'Scott',
                                       query: {
                                           page: 1,
                                           record_type: 'alumni',
                                           record_id: 1
                                       },
                                       params: {
                                           id: 1 
                                       }
                                   }, 
                                   null
                               );
                               
                               
                               assert.equal(testResult, 'success');
                            });
                           });
                
                           describe('Testing - Alumnus records', function() {
                            it('appDeleteDataAlumni - user not null - unsuccessful', async function() {
                           
                           
                             
                             
                                   errorExpected = true;
                                   let testResult = await appDeleteDataAlumni(
                                       {
                                           user: 'Scott',
                                           query: {
                                               page: 1,
                                               record_type: 'alumni'
                                           },
                                           params: {
                                               id: 1 
                                           }
                                       }, 
                                       null
                                   );
                                   
                                   
                                   assert.equal(testResult, 'Required parameters were not supplied.');
                                });
                               });
        


                               describe('Testing - Alumnus records', function() {
                                it('appPostDataAlumni - user null', async function() {
                               
                               
                                 
                                 
                                       errorExpected = false;
                                       let testResult = await appPostDataAlumni(
                                           {
                                               user: null,
                                               query: {
                                                   page: 1
                                               },
                                               params: {
                                                   id: 1 
                                               }
                                           }, 
                                           null
                                       );
                                       
                                       
                                       assert.equal(testResult, 'Unauthorized use not permitted');
                                    });
                                   });
                         
                        
                            describe('Testing - Alumnus records', function() {
                                it('appPostDataAlumni - user not null - successful', async function() {
                               
                               
                                 
                                 
                                       errorExpected = false;
                                       let testResult = await appPostDataAlumni(
                                           {
                                               user: 'Scott',
                                               query: {
                                                   page: 1,
                                                   recordType: 'alumni',
                                                   record_id: 1
                                               },
                                               params: {
                                                   id: 1 
                                               },
                                                
                                               body: { 
                                                recordType: 'alumni'
                                               }
                                           }, 
                                           null
                                       );
                                       
                                       
                                       assert.equal(testResult, 'success');
                                    });
                                   });
                        
                                   describe('Testing - Alumnus records', function() {
                                    it('appPostDataAlumni - user not null - unsuccessful', async function() {
                                   
                                   
                                     
                                     
                                           errorExpected = true;
                                           let testResult = await appPostDataAlumni(
                                               {
                                                   user: 'Scott',
                                                   query: {
                                                       page: 1,
                                                       record_type: 'alumni'
                                                   },
                                                   params: {
                                                       id: 1 
                                                   },
                                                   body: { 
                                                    recordType: 'alumni'
                                                   }
                                               }, 
                                               null
                                           );
                                           
                                           
                                           assert.equal(testResult, 'failed');
                                        });
                                       });



                                       describe('Testing - Alumnus records', function() {
                                        it('appPutDataAlumni - user null', async function() {
                                       
                                       
                                         
                                         
                                               errorExpected = false;
                                               let testResult = await appPutDataAlumni(
                                                   {
                                                       user: null,
                                                       query: {
                                                           page: 1
                                                       },
                                                       params: {
                                                           id: 1 
                                                       }
                                                   }, 
                                                   null
                                               );
                                               
                                               
                                               assert.equal(testResult, 'Unauthorized use not permitted');
                                            });
                                           });
                                 
                                
                                    describe('Testing - Alumnus records', function() {
                                        it('appPostDataAlumni - user not null - successful', async function() {
                                       
                                       
                                         
                                         
                                               errorExpected = false;
                                               let testResult = await appPutDataAlumni(
                                                   {
                                                       user: 'Scott',
                                                       query: {
                                                           page: 1,
                                                           recordType: 'alumni',
                                                           record_id: 1
                                                       },
                                                       params: {
                                                           id: 1 
                                                       },
                                                        body: {
                                                            recordType: 'alumni',
                                                            data: { 
                                                                alumnus_id: 1
                                                               }
                                                        },
                                                       
                                                   }, 
                                                   null
                                               );
                                               
                                               
                                               assert.equal(testResult, 'success');
                                            });
                                           });
                                
                                           describe('Testing - Alumnus records', function() {
                                            it('appPutDataAlumni - user not null - unsuccessful', async function() {
                                           
                                           
                                             
                                             
                                                   errorExpected = true;
                                                   let testResult = await appPutDataAlumni(
                                                       {
                                                           user: 'Scott',
                                                           query: {
                                                               page: 1,
                                                               record_type: 'alumni'
                                                           },
                                                           params: {
                                                               id: 1 
                                                           },
                                                           body: {
                                                            recordType: 'alumni',
                                                            data: { 
                                                                alumnus_id: 1
                                                               }
                                                        }
                                                        
                                                       }, 
                                                       null
                                                   );
                                                   
                                                   
                                                   assert.equal(testResult, 'failed');
                                                });
                                               });
        

//  app.get('/data/alumni/search'

   appGetAlumniSearch =   function(req, res)  {
    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
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
//criteria += ' LIMIT ' + (req.query.page == undefined ? 0 : req.query.page - 1) * (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage) + ',' + (req.query.itemsPerPage == undefined ? common.DEFAULT_PAGE_SIZE : req.query.itemsPerPage);
    
        
      return common.database.executeQuery('query').then(results => results).catch(errors => 
             errors);
              



    };


//app.get('/data/alumni/byid/:id'
    
    appGetDataAlumniByID =  function (req, res) {
        if (req.user == null) {
            return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
            
        }


        let result = {
            alumni: null,
            alumni_employments: null,
            graduateSchools: null,
            alumni_degrees: null,
            comments: null,


        };
        let query = 'SELECT * FROM alumni WHERE alumnus_id = ?';



        return common.database.executeQuery(query, req.params['id']).then(results => {
            result.alumni = results;
            
            let employmentsPromise = common.database.executeQuery('SELECT employment_id, employers.employer_id, employer_name, city, state, job_title, active,  alumni_employments.added_by, alumni_employments.added_datetime,' +
                ' alumni_employments.updated_by, alumni_employments.updated_datetime FROM alumni_employments INNER JOIN employers ON alumni_employments.employer_id' +
                ' = employers.employer_id WHERE alumnus_id = ? AND alumni_employments.deleted = 0', req.params['id']);

            let degreesPromise = common.database.executeQuery('SELECT degree_id, diploma_description, graduation_term_code, added_by, added_datetime, updated_by, updated_datetime' +
                ' FROM alumni_degrees WHERE alumnus_id = ? AND deleted = 0', req.params['id']);

            let graduateSchoolsPromise = common.database.executeQuery('SELECT alumnus_id, alumni_graduate_school_id, graduate_schools.graduate_school_id, school_name, city, state, alumni_graduate_schools.added_by, alumni_graduate_schools.added_datetime,' +
                ' alumni_graduate_schools.updated_by, alumni_graduate_schools.updated_datetime FROM alumni_graduate_schools INNER JOIN graduate_schools ON graduate_schools.graduate_school_id' +
                ' = alumni_graduate_schools.graduate_school_id WHERE alumnus_id = ? AND alumni_graduate_schools.deleted = 0', req.params['id']);

            let commentsPromise = common.database.executeQuery('SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'A\' AND entity_id = ? AND deleted = 0',req.params['id']);

           return Promise.all([employmentsPromise, degreesPromise, graduateSchoolsPromise, commentsPromise]).then(results => {
            result.alumni_employments = results[0];
            result.alumni_degrees = results[1];
            result.graduateSchools = results[2];
            result.comments = results[3];
          return result;
            }).catch(error => {
              
                return error;
            });



        }).catch(error => error);
    };

    // app.get('/data/alumni/search/pageCount'
    appGetPageCount = (req, res) => {

        if (req.user == null) {
            return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
            
        }

        let baseQuery = 'SELECT COUNT(DISTINCT alumni.alumnus_id) ItemCount FROM alumni LEFT JOIN alumni_employments on alumni_employments.alumnus_id = alumni.alumnus_id AND alumni_employments.active = 1 AND alumni_employments.deleted = 0' +
            ' LEFT JOIN employers ON alumni_employments.employer_id = employers.employer_id AND employers.deleted = 0 LEFT JOIN alumni_degrees' +
            ' ON alumni_degrees.alumnus_id = alumni.alumnus_id AND alumni_degrees.deleted = 0 LEFT JOIN alumni_graduate_schools ON alumni_graduate_schools.alumnus_id' +
            ' = alumni.alumnus_id AND alumni_graduate_schools.deleted = 0 LEFT JOIN graduate_schools ON alumni_graduate_schools.graduate_school_id = graduate_schools.graduate_school_id' +
            ' WHERE alumni.deleted = 0'

      let [criteria, propValues] = common.getQueryValues('', 'alumni');
        
       return common.database.executeQuery(baseQuery + criteria, propValues).then(result => {
            return result;

        }).catch(error => {
            return error;
        });



    };


    //  app.get("/data/alumni/childData"
    appGetDataAlumniChildData = (req, res) => {


        if (req.user == null) {
            return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
            
        }

        result = {
            data: null
        }



      


        return common.database.executeQuery(common.tableData[req.query['record_type']].recordQueryString, req.query['record_id'])
            .then(results => {
                result.data = results[0];
                return results;
            }).catch(error => error);


    };





    // app.delete("/data/alumni"
    appDeleteDataAlumni = (req, res) => {

        if (req.user == null) {
            return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
            
        }


        let keyField;

        if (!req.query['record_type'] || !req.query['record_id']) {
            return common.sendErrorResponse(res, 400, 'Required parameters were not supplied.');

        }

        else if (common.tableData[req.query['record_type']] == null || (keyField = common.tableData[req.query['record_type']]['keyField']) == null) {

            return common.sendErrorResponse(res, 400, 'Record type specified is not valid for this operation.');

        }

        else {


            return common.database.executeQuery('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', [req.query['record_type'], keyField, req.query['record_id']])
                .then(result => "success").
                catch(error => common.sendErrorResponse(res, 400, error.message));





        }

    };


// app.post("/data/alumni", (req, res)
    appPostDataAlumni = (req, res) => {
        if (req.user == null) {
            return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
           
        }


        result = {
            validationError: false,
            otherError: false,
            noChange: false,
            data: null
        };
        alumniData = req.body;

        if (!alumniData['recordType'] || !common.tableData[alumniData['recordType']]) {
            return common.sendErrorResponse(res, 400, 'The record type specified is not valid for this operation.');

        }
        else {
            let recordType = alumniData['recordType'];
            let keyField = common.tableData[alumniData['recordType']].keyField;
            let data = alumniData['data'];
   
            let errorsExist;
            let errors;


        errorsExist = false;


            if (errorsExist) {
                result.validationError = true;
                result.data = errors;
                res.send(result);
            }
            else {

                let newData = null;
             
                        

                return common.database.executeQuery('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', [recordType, newData]).then(results => {

                     return common.database.executeQuery(common.tableData[recordType].recordQueryString, results.insertId).then(results => {

                       return results;

                    }).catch(error => common.sendErrorResponse(res, 400, error.message));


                }).catch(error => error);
            }
        }

    }

  //  app.put("/data/alumni"
    appPutDataAlumni =  (req, res) => {

        if (req.user == null) {
            return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
            
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
    
            let errorsExist = false;
            let errors;



            if (errorsExist) {
                result.validationError = true;
                result.data = errors;
                res.send(result);
            }


            else {
                return common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {
                   changesFound = true;

                    if (changesFound) {
                  
                        return common.database.executeQuery('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', 'test')
                            .then(results => {
                                
                                    return common.database.executeQuery(common.tableData[recordType].recordQueryString, data[keyField]).then(results => {
                                        
                                        return results;
                                    }).catch(
                                        
                                        error => common.sendErrorResponse(res, 400, error.message))
                                    }).catch(error => common.sendErrorResponse(res, 400, 'failed'));
                    }


                    else {
                       return results;
                    }
                }).catch(error => common.sendErrorResponse(res, 400, 'failed'));



            }





        }






    }



