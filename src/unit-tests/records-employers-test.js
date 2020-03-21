
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

describe('Testing - Employer records', function() {



it('appGetDataEmployersSelectionList - user null', async function() {


  
  
   let testResult = await appGetDataEmployersSelectionList(
       {
           user: null
       }, 
       null
   );

    assert.equal(testResult, 'Unauthorized use not permitted');
    
});



});


describe('Testing - Employer records', function() {

it('appGetDataEmployersSelectionList - user not null - successful search',  async function() {


  
  
    let testResult = await appGetDataEmployersSelectionList(
            {
                user: 'Scott',
                page: 1
            },
               null
        );
        
    
    assert.equal(testResult, 'success');
    
 
 
 });
 
});


describe('Testing - Employer records', function() {
 it('appGetDataEmployersSelectionList - user not null - unsuccessful search', async function() {


  
  
        errorExpected = true;
        let testResult = await appGetDataEmployersSelectionList(
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
 






describe('Testing - Employer records', function() {



    it('appGetDataEmployersSearch - user null', async function() {
    
    
      
      
       let testResult = await appGetDataEmployersSearch(
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
    
    
    describe('Testing - Employer records', function() {
    
    it('appGetDataEmployersSearch - user not null - successful search',  async function() {
    
    
      
      errorExpected = false;
        let testResult = await appGetDataEmployersSearch(
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
    
    
    describe('Testing - Employer records', function() {
     it('appGetDataEmployersSearch - user not null - unsuccessful search', async function() {
    
    
      
      
            errorExpected = true;
            let testResult = await appGetDataEmployersSearch(
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



    describe('Testing - Employer records', function() {



        it('appGetDataEmployersSearchPageCount - user null', async function() {
        
        
          
          
           let testResult = await appGetDataEmployersSearchPageCount(
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
        
        
        describe('Testing - Employer records', function() {
        
        it('appGetDataEmployersSearchPageCount - user not null - successful search',  async function() {
        
        
          
          errorExpected = false;
            let testResult = await appGetDataEmployersSearchPageCount(
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
        
        
        describe('Testing - Employer records', function() {
         it('appGetDataEmployersSearchPageCount - user not null - unsuccessful search', async function() {
        
        
          
          
                errorExpected = true;
                let testResult = await appGetDataEmployersSearchPageCount(
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
    
    
    
        describe('Testing - Employer records', function() {



            it('appGetDataEmployersByID - user null', async function() {
            
            
              
              
               let testResult = await appGetDataEmployersByID(
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
            
            
            describe('Testing - Employer records', function() {
            
            it('appGetDataEmployersByID - user not null - successful search',  async function() {
            
            
              
              errorExpected = false;
                let testResult = await appGetDataEmployersByID(
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
            
            
            describe('Testing - Employer records', function() {
             it('appGetDataEmployersByID - user not null - unsuccessful search', async function() {
            
            
              
              
                    errorExpected = true;
                    let testResult = await appGetDataEmployersByID(
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
        
        


            
            
        describe('Testing - Employer records', function() {



            it('appGetDataEmployersChildData - user null', async function() {
            
            
              
              
               let testResult = await appGetDataEmployersChildData(
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
            
            
            describe('Testing - Employer records', function() {
            
            it('appGetDataEmployersChildData - user not null - successful search',  async function() {
            
            
              
              errorExpected = false;
                let testResult = await appGetDataEmployersChildData(
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
            
            
            describe('Testing - Employer records', function() {
             it('appGetDataEmployersChildData - user not null - unsuccessful search', async function() {
            
            
              
              
                    errorExpected = true;
                    let testResult = await appGetDataEmployersChildData(
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
        
        
            describe('Testing - Employer records', function() {



                it('appPostDataEmployers - user null', async function() {
                
                
                  
                  
                   let testResult = await appPostDataEmployers(
                       {
                           user: null,
                           query: {
            
                           },
                           body: {
                               recordType: 'employer'
                           }
                       }, 
                       null
                   );
                
                    assert.equal(testResult, 'Unauthorized use not permitted');
                    
                });
                
                
                
                });
                
                
                describe('Testing - Employer records', function() {
                
                it('appPostDataEmployers - user not null - successful search',  async function() {
                
                
                  
                  errorExpected = false;
                    let testResult = await appPostDataEmployers(
                            {
                                user: 'Scott',
                                page: 1,
                                body: {
                                    recordType: 'employers'
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
                
                
                describe('Testing - Employer records', function() {
                 it('appPostDataEmployers - user not null - unsuccessful search', async function() {
                
                
                  
                  
                        errorExpected = true;
                        let testResult = await appPostDataEmployers(
                            {
                                user: 'Scott',
                                body: {
                                    recordType: 'employers'
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
            
          
    
                describe('Testing - Employer records', function() {



                    it('appPutDataEmployers - user null', async function() {
                    
                    
                      
                      
                       let testResult = await appPutDataEmployers(
                           {
                               user: null,
                               query: {
                
                               },
                               body: {
                                   recordType: 'employer'
                               }
                           }, 
                           null
                       );
                    
                        assert.equal(testResult, 'Unauthorized use not permitted');
                        
                    });
                    
                    
                    
                    });
                    
                    
                    describe('Testing - Employer records', function() {
                    
                    it('appPutDataEmployers - user not null - successful search',  async function() {
                    
                    
                      
                      errorExpected = false;
                        let testResult = await appPutDataEmployers(
                                {
                                    user: 'Scott',
                                    page: 1,
                                    body: {
                                        recordType: 'employers'
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
                    
                    
                    describe('Testing - Employer records', function() {
                     it('appPutDataEmployers - user not null - unsuccessful search', async function() {
                    
                    
                      
                      
                            errorExpected = true;
                            let testResult = await appPutDataEmployers(
                                {
                                    user: 'Scott',
                                    body: {
                                        recordType: 'employers'
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
                
    
                    describe('Testing - Employer records', function() {



                        it('appDeleteDataEmployers - user null', async function() {
                        
                        
                          
                          
                           let testResult = await appDeleteDataEmployers(
                               {
                                   user: null,
                                   query: {
                    
                                   },
                                   params: {
                                       record_type: 'employer'
                                   }
                               }, 
                               null
                           );
                        
                            assert.equal(testResult, 'Unauthorized use not permitted');
                            
                        });
                        
                        
                        
                        });
                        
                        
                        describe('Testing - Employer records', function() {
                        
                        it('appDeleteDataEmployers - user not null - successful search',  async function() {
                        
                        
                          
                          errorExpected = false;
                            let testResult = await appDeleteDataEmployers(
                                    {
                                        user: 'Scott',
                                        page: 1,
                                       
                                        query: {
                                            record_type: 'employers',
                                            record_id: 1
                                        }
                                    },
                                       null
                                );
                                
                            
                            assert.equal(testResult, 'success');
                            
                         
                         
                         });
                         
                        });
                        
                        
                        describe('Testing - Employer records', function() {
                         it('appDeleteDataEmployers - user not null - unsuccessful search', async function() {
                        
                        
                          
                          
                                errorExpected = true;
                                let testResult = await appDeleteDataEmployers(
                                    {
                                        user: 'Scott',
                                        query: {
                                            record_type: 'employers',
                                            record_id: 1
                                        }
                                    }, 
                                    null
                                );
                                assert.equal(testResult, 'failed');
                        
                           
                         
                         
                         });
                         
                        });
                






// app.get("/data/employers/selectionList"
appGetDataEmployersSelectionList = (req, res) => {

    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
    }
    
    let query = "SELECT employer_id value, CASE WHEN city IS NULL THEN employer_name ELSE CONCAT(employer_name," +
        "', ',city ,', ',state) END text from employers WHERE deleted = 0 ORDER BY employer_name, state, city";

        return common.database.executeQuery(query).then(result => result).
        catch(error => common.sendErrorResponse(res,400, 'failed'));
    



};
        
// app.get('/data/employers/search'
appGetDataEmployersSearch =  (req, res) => {

    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
    }

    let baseQuery = 'SELECT employer_id, employer_name, city, state FROM employers WHERE deleted = 0'
    

    
   
    return common.database.executeQuery('test', null).then(result => result).
    catch(error => common.sendErrorResponse(res,400, 'failed'));



};
// app.get('/data/employers/search/pageCount
appGetDataEmployersSearchPageCount =  (req, res) => {
    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
    }
    let baseQuery = 'SELECT COUNT(DISTINCT employer_id) ItemCount FROM employers WHERE deleted = 0'


    return common.database.executeQuery(baseQuery).then(result => result).
    catch(error => common.sendErrorResponse(res,400, error));

};

// app.get('/data/employers/byid/:id'
appGetDataEmployersByID = (req, res) => {

    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
    }

    let result = {
        employer: null,
        comments: null


    };


    let query = 'SELECT * FROM employers WHERE employer_id = ?';





    return common.database.executeQuery(query, req.params['id']).then(results => {

       

        query = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE entity_type = \'E\' AND entity_id = ? AND deleted = 0';
      
        return common.database.executeQuery(query, req.params['id']).then(results => results).catch(error => sendErrorResponse(res,400, error));

    }).catch(error => common.sendErrorResponse(res,400, error));


           


};


// app.get("/data/employers/childData",
appGetDataEmployersChildData = (req, res) => {

    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
    }

    result = {
        data: null
    }



    selectString: String;

    if (!common.tableData[req.query['record_type']]) {
        return common.sendErrorResponse(res, 400, 'failed');
        
    }

    return common.database.executeQuery(common.tableData[req.query['record_type']].recordQueryString, req.query['record_id']).then(results => {
        return results;
    }).catch(error => common.sendErrorResponse(res,400,error));

    

};



// app.post("/data/employers",
appPostDataEmployers =  (req, res) => {


    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
    }


    result = {
        validationError: false,
        otherError: false,
        noChange: false,
        data: null
    }
    employerData = req.body;

    if (!employerData['recordType'] || !common.tableData[employerData['recordType']]) {
        return 'error';
    }
    else {
        let recordType = employerData['recordType'];
        let data = employerData['data'];
      
        let errorsExist = false;
        let errors;


       


        if (errorsExist) {
           return 'error';
        }
        else {


            return common.database.executeQuery('INSERT INTO ?? SET ?, added_datetime = NOW(), updated_datetime = NOW()', null).then(result => {

                return common.database.executeQuery(common.tableData[recordType].recordQueryString, null).then(results => {
                    return results;
                }).catch(error => { 
                   return error;
                });



            }).catch(error => { 
               return error;
            });
        }
    }

          
};

// app.put("/data/employers"
appPutDataEmployers =  (req, res) => {

    if (req.user == null) {
        return common.sendErrorResponse(res, 401, "Unauthorized use not permitted");
        
    }

    result = {
        validationError: false,
        otherError: false,
        noChange: false,
        data: null
    }
    employerData = req.body;

    if (!employerData['recordType'] || !common.tableData[employerData['recordType']]) {
        return 'error';
    }
    else {
        let recordType = employerData['recordType'];
        let keyField = common.tableData[employerData['recordType']].keyField;
        let data = employerData['data'];
     
        let errorsExist = false;
        let errors;


     

        if (errorsExist) {
          return 'error';
        }
        else {


            return common.database.executeQuery(common.tableData[recordType].recordQueryString, null).then(results => {


            let changesFound = true;
                if (changesFound) {
                 
                 
                 return   common.database.executeQuery('UPDATE ?? SET ?, updated_datetime = NOW() WHERE ?? = ?', null)
                        .then(result => {
                            
                                return common.database.executeQuery(null, null).then(results => {
                                   
                                        
                                      
                                       return results

                                    
                                }).catch(error => { 
                                    return error;
                                });
                            
                        }).catch(error => { return error;
                        });
                }
                else {
                    result.noChange = true;
                    res.send(result);
                }
            }).catch(error => { 
                return error;
            });
        }


    }
};


// app.delete("/data/employers"
appDeleteDataEmployers =  (req, res) => {
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

        return common.database.executeQuery('UPDATE ?? SET deleted = 1, updated_datetime = NOW() WHERE ?? = ?', null).then(result => {

            
               return result;

            


        }).catch(error => { 
            return common.sendErrorResponse(res, 400, error);

        });
    }

};
