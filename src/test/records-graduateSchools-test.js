
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

describe('Testing - GraduateSchool records', function() {



it('appGetDataGraduateSchoolsSelectionList - user null', async function() {


  
  
   let testResult = await appGetDataGraduateSchoolsSelectionList(
       {
           user: null
       }, 
       null
   );

    assert.equal(testResult, 'Unauthorized use not permitted');
    
});



});


describe('Testing - GraduateSchool records', function() {

it('appGetDataGraduateSchoolsSelectionList - user not null - successful search',  async function() {


  
  
    let testResult = await appGetDataGraduateSchoolsSelectionList(
            {
                user: 'Scott',
                page: 1
            },
               null
        );
        
    
    assert.equal(testResult, 'success');
    
 
 
 });
 
});


describe('Testing - GraduateSchool records', function() {
 it('appGetDataGraduateSchoolsSelectionList - user not null - unsuccessful search', async function() {


  
  
        errorExpected = true;
        let testResult = await appGetDataGraduateSchoolsSelectionList(
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
 






describe('Testing - GraduateSchool records', function() {



    it('appGetDataGraduateSchoolsSearch - user null', async function() {
    
    
      
      
       let testResult = await appGetDataGraduateSchoolsSearch(
           {
               user: null,
               query: {

               }
           }, 
           null
       );
    
        assert.equal(testResult, 'Unauthorized use not permitted');
        
    });
    
    
    
    });
    
    
    describe('Testing - GraduateSchool records', function() {
    
    it('appGetDataGraduateSchoolsSearch - user not null - successful search',  async function() {
    
    
      
      errorExpected = false;
        let testResult = await appGetDataGraduateSchoolsSearch(
                {
                    user: 'Scott',
                    page: 1,
                    query: {
                   
                    }
                },
                   null
            );
            
        
        assert.equal(testResult, 'success');
        
     
     
     });
     
    });
    
    
    describe('Testing - GraduateSchool records', function() {
     it('appGetDataGraduateSchoolsSearch - user not null - unsuccessful search', async function() {
    
    
      
      
            errorExpected = true;
            let testResult = await appGetDataGraduateSchoolsSearch(
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



    describe('Testing - GraduateSchool records', function() {



        it('appGetDataGraduateSchoolsSearchPageCount - user null', async function() {
        
        
          
          
           let testResult = await appGetDataGraduateSchoolsSearchPageCount(
               {
                   user: null,
                   query: {
    
                   }
               }, 
               null
           );
        
            assert.equal(testResult, 'Unauthorized use not permitted');
            
        });
        
        
        
        });
        
        
        describe('Testing - GraduateSchool records', function() {
        
        it('appGetDataGraduateSchoolsSearchPageCount - user not null - successful search',  async function() {
        
        
          
          errorExpected = false;
            let testResult = await appGetDataGraduateSchoolsSearchPageCount(
                    {
                        user: 'Scott',
                        page: 1,
                        query: {
                       
                        }
                    },
                       null
                );
                
            
            assert.equal(testResult, 'success');
            
         
         
         });
         
        });
        
        
        describe('Testing - GraduateSchool records', function() {
         it('appGetDataGraduateSchoolsSearchPageCount - user not null - unsuccessful search', async function() {
        
        
          
          
                errorExpected = true;
                let testResult = await appGetDataGraduateSchoolsSearchPageCount(
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
    
    
    
        describe('Testing - GraduateSchool records', function() {



            it('appGetDataGraduateSchoolsByID - user null', async function() {
            
            
              
              
               let testResult = await appGetDataGraduateSchoolsByID(
                   {
                       user: null,
                       query: {
        
                       }
                   }, 
                   null
               );
            
                assert.equal(testResult, 'Unauthorized use not permitted');
                
            });
            
            
            
            });
            
            
            describe('Testing - GraduateSchool records', function() {
            
            it('appGetDataGraduateSchoolsByID - user not null - successful search',  async function() {
            
            
              
              errorExpected = false;
                let testResult = await appGetDataGraduateSchoolsByID(
                        {
                            user: 'Scott',
                            page: 1,
                            query: {
                           
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
            
            
            describe('Testing - GraduateSchool records', function() {
             it('appGetDataGraduateSchoolsByID - user not null - unsuccessful search', async function() {
            
            
              
              
                    errorExpected = true;
                    let testResult = await appGetDataGraduateSchoolsByID(
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
        
        

            
        describe('Testing - GraduateSchool records', function() {



            it('appGetDataGraduateSchoolsChildData - user null', async function() {
            
            
              
              
               let testResult = await appGetDataGraduateSchoolsChildData(
                   {
                       user: null,
                       query: {
        
                       }
                   }, 
                   null
               );
            
                assert.equal(testResult, 'Unauthorized use not permitted');
                
            });
            
            
            
            });
            
            
            describe('Testing - GraduateSchool records', function() {
            
            it('appGetDataGraduateSchoolsChildData - user not null - successful search',  async function() {
            
            
              
              errorExpected = false;
                let testResult = await appGetDataGraduateSchoolsChildData(
                        {
                            user: 'Scott',
                            page: 1,
                            query: {
                                record_type: 'comments'
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
            
            
            describe('Testing - GraduateSchool records', function() {
             it('appGetDataGraduateSchoolsChildData - user not null - unsuccessful search', async function() {
            
            
              
              
                    errorExpected = true;
                    let testResult = await appGetDataGraduateSchoolsChildData(
                        {
                            user: 'Scott',
                            query: {
                                record_type: 'comments'
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
        
        
            describe('Testing - GraduateSchool records', function() {



                it('appPostDataGraduateSchools - user null', async function() {
                
                
                  
                  
                   let testResult = await appPostDataGraduateSchools(
                       {
                           user: null,
                           query: {
            
                           },
                           body: {
                               recordType: 'graduateschool'
                           }
                       }, 
                       null
                   );
                
                    assert.equal(testResult, 'Unauthorized use not permitted');
                    
                });
                
                
                
                });
                
                
                describe('Testing - GraduateSchool records', function() {
                
                it('appPostDataGraduateSchools - user not null - successful search',  async function() {
                
                
                  
                  errorExpected = false;
                    let testResult = await appPostDataGraduateSchools(
                            {
                                user: 'Scott',
                                page: 1,
                                body: {
                                    recordType: 'graduateschools'
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
                
                
                describe('Testing - GraduateSchool records', function() {
                 it('appPostDataGraduateSchools - user not null - unsuccessful search', async function() {
                
                
                  
                  
                        errorExpected = true;
                        let testResult = await appPostDataGraduateSchools(
                            {
                                user: 'Scott',
                                body: {
                                    recordType: 'graduateschools'
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
            
          
    
                describe('Testing - GraduateSchool records', function() {



                    it('appPutDataGraduateSchools - user null', async function() {
                    
                    
                      
                      
                       let testResult = await appPutDataGraduateSchools(
                           {
                               user: null,
                               query: {
                
                               },
                               body: {
                                   recordType: 'graduateschool'
                               }
                           }, 
                           null
                       );
                    
                        assert.equal(testResult, 'Unauthorized use not permitted');
                        
                    });
                    
                    
                    
                    });
                    
                    
                    describe('Testing - GraduateSchool records', function() {
                    
                    it('appPutDataGraduateSchools - user not null - successful search',  async function() {
                    
                    
                      
                      errorExpected = false;
                        let testResult = await appPutDataGraduateSchools(
                                {
                                    user: 'Scott',
                                    page: 1,
                                    body: {
                                        recordType: 'graduateschools'
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
                    
                    
                    describe('Testing - GraduateSchool records', function() {
                     it('appPutDataGraduateSchools - user not null - unsuccessful search', async function() {
                    
                    
                      
                      
                            errorExpected = true;
                            let testResult = await appPutDataGraduateSchools(
                                {
                                    user: 'Scott',
                                    body: {
                                        recordType: 'graduateschools'
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
                
    
                    describe('Testing - GraduateSchool records', function() {



                        it('appDeleteDataGraduateSchools - user null', async function() {
                        
                        
                          
                          
                           let testResult = await appDeleteDataGraduateSchools(
                               {
                                   user: null,
                                   query: {
                    
                                   },
                                   params: {
                                       record_type: 'graduateschool'
                                   }
                               }, 
                               null
                           );
                        
                            assert.equal(testResult, 'Unauthorized use not permitted');
                            
                        });
                        
                        
                        
                        });
                        
                        
                        describe('Testing - GraduateSchool records', function() {
                        
                        it('appDeleteDataGraduateSchools - user not null - successful search',  async function() {
                        
                        
                          
                          errorExpected = false;
                            let testResult = await appDeleteDataGraduateSchools(
                                    {
                                        user: 'Scott',
                                        page: 1,
                                       
                                        query: {
                                            record_type: 'graduateschools',
                                            record_id: 1
                                        }
                                    },
                                       null
                                );
                                
                            
                            assert.equal(testResult, 'success');
                            
                         
                         
                         });
                         
                        });
                        
                        
                        describe('Testing - GraduateSchool records', function() {
                         it('appDeleteDataGraduateSchools - user not null - unsuccessful search', async function() {
                        
                        
                          
                          
                                errorExpected = true;
                                let testResult = await appDeleteDataGraduateSchools(
                                    {
                                        user: 'Scott',
                                        query: {
                                            record_type: 'graduateschools',
                                            record_id: 1
                                        }
                                    }, 
                                    null
                                );
                                assert.equal(testResult, 'failed');
                        
                           
                         
                         
                         });
                         
                        });
                




                        // app.get('/data/graduateSchools/search'
                        appGetDataGraduateSchoolsSearch =  (req, res) => {

                            if (req.user == null) {
                                return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                                
                            }

                            
                    
                               return common.database.executeQuery(null,null).then(result => {
                                
                                    return result
                     
                            }).catch(error => common.sendErrorResponse(res, 400, error));
                    
                        };
                    
                    // app.get('/data/graduateSchools/search/pageCount'
                        appGetDataGraduateSchoolsSearchPageCount = (req, res) => {

                            if (req.user == null) {
                                return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                                
                            }

                            let baseQuery = 'SELECT COUNT(DISTINCT graduate_school_id) ItemCount FROM graduate_schools WHERE deleted = 0'
                    
                           
                    
                            return common.database.executeQuery(baseQuery, null).then(result => {
                                
                                   return result;
                                
                            }).catch(error => common.sendErrorResponse(res, 400, error));
                    
                        };

// app.get('/data/graduateSchools/byid/:id'
                        appGetDataGraduateSchoolsByID =  (req, res) => {

                            if (req.user == null) {
                                return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                                
                            }
                    
                            let result = {
                                graduateSchool: null,
                                comments: null
                    
                    
                            };
                    
                    
                    
                    
                            let query = 'SELECT * FROM graduate_schools WHERE graduate_school_id = ?';
                    
                           return common.database.executeQuery(query,null).then( results => {
                                
                                    return common.database.executeQuery(query, null).then(results => {
                                       
                                            return results;
                                       
                                       
                                    }).catch(error => common.sendErrorResponse(res, 400, error));
                                
                    
                            }).catch(error => common.sendErrorResponse(res,400,error));
                    
                    
                    
                        };
                    
//app.get("/data/graduateSchools/childData"
                      appGetDataGraduateSchoolsChildData = (req, res) => {

                            if (req.user == null) {
                                return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                                
                            }
                    
                            result = {
                                data: null
                            }
                    
                    
                    
                          
                    
                            return common.database.executeQuery(null,null).then(results => {
                                
                                   return results;
                                
                    
                            }).catch(error => common.sendErrorResponse(res, 400, error));
                    
                        };
                    
                    
// app.post("/data/graduateSchools"
                       appPostDataGraduateSchools =  (req, res) => {

                            if (req.user == null) {
                               return  common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                                
                            }
                    
                    
                            result = {
                                validationError: false,
                                otherError: false,
                                noChange: false,
                                data: null
                            }
                            graduateSchoolData = req.body;
                    
                    
                             
                    errorsExist = false;
                    
                                if (errorsExist) {
                                    return result;
                                }
                                else {
                    
                                    
                    
                    
                                    return common.database.executeQuery('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', null).then(result => {
                    
                                       return common.database.executeQuery(null,null).then(results => {
                                            
                                           return results;
                    
                    
                                        }).catch(errors => { 
                                            
                                           return errors;
                    
                                    });
                    
                                }).catch(errors =>
                                    {
                                        
                                        return errors;
                                    });
                    
                            }
                        };
                    
                //  app.put("/data/graduateSchools", 
                       appPutDataGraduateSchools = (req, res) => {

                            if (req.user == null) {
                                return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                                
                            }
                    
                            result = {
                                validationError: false,
                                otherError: false,
                                noChange: false,
                                data: null
                            }
                            graduateSchoolData = req.body;
                    
                          errorsExist = false;
                    
                                if (errorsExist) {
                                    result.validationError = true;
                                    result.data = errors;
                                    res.send(result);
                                }
                                else {
                    
                                    return common.database.executeQuery(null,null).then(results => {
                    
                    
                                       changesFound = true;
                                        if (changesFound) {
                    
                                            return common.database.executeQuery('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', null).then(
                                                result => {
                    
                                                       return  common.database.executeQuery(null,null).then(results => {
                                  
                    
                                                           return results;
                    
                                                            
                                                        }).catch(error => error);
                                        }).catch(error => { 
                                                    
                                            return error;
                                        });

                                    }
                                        else {
                                           return result;
                                        }
                                    }).catch(error => { 
                                                    
                                        return error;
                                    });
                                }
                    
                    
                           
                        };

// app.delete("/data/graduateSchools"
                        appDeleteDataGraduateSchools =  (req, res) => {



                            if (req.user == null) {
                                return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                                
                            }
                    
                    
                            let keyField;
                    
                            if (!req.query['record_type'] || !req.query['record_id']) {
                                return common.sendErrorResponse(res, 400, 'Required parameters were not supplied.');
                    
                    
                            }
                    
                    
                            else {
                    
                                return common.database.executeQuery('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', null).then( result => {
                    
                                       return result;
                    
                                    
                    
                    
                                }).catch(error => { 
                                        return common.sendErrorResponse(res, 400, error);
                    
                                });
                            }
                    
                        };
                    
                    
                    
                    
                    
                    
                    
                    //  app.get("/data/graduate-schools/selectionList",
                        appGetDataGraduateSchoolsSelectionList = (req, res) => {
                    
                            if (req.user == null) {
                               return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
                               
                            }
                    
                    
                            let query = "SELECT graduate_school_id value, CASE WHEN city IS NULL THEN school_name ELSE CONCAT(school_name," +
                                "', ',city ,', ',state) END text from graduate_schools WHERE deleted = 0 ORDER BY school_name, state, city";
                    
                            return common.database.executeQuery(query).then(result => {
                             return result
                                
                            }).catch(error => common.sendErrorResponse(res,400,error));
                        };
                    
                    
                    
                    