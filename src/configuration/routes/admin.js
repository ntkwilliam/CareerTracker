const common = require('./common');
const validator = require('../../validations/admin');
const bcryptjs = require('bcryptjs');
module.exports = function (app) {




    app.get('/admin/userList', (req, res) => {
        if (req.user == null || req.user.role != 'A') {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }

        common.database.executeQuery('SELECT user_id, last_name, first_name, active, role FROM users ORDER BY last_name, first_name')
        .then(result =>  
            res.send(result)
       ).catch(error => common.sendErrorResponse(res,400, error.message)

       );


    });

    app.post('/admin/disableUser', (req, res) => {
        if (req.user == null || req.user.role != 'A') {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        } else if (req.body.params['user_id'] == undefined) {
          
            common.sendErrorResponse(res, 401, 'The required user_id parameter was not supplied.');
            return;
        }
         else if (req.user.user_id == req.body.params['user_id'] || req.body.params['user_id']  == 'root') {
            common.sendErrorResponse(res, 401, 'The requested operation is not permitted.');
            return;
        }
        
        common.database.executeQuery('SELECT COUNT(*) AS CNT FROM users WHERE user_id = ? AND active = 1',req.body.params['user_id'] ).then(results => {
            if(results[0]['CNT'] == 0) {
                common.sendErrorResponse(res, 401, 'The requested user_id is not valid or is already disabled');
            return;
            }
            
            common.database.executeQuery('UPDATE users SET active = 0 WHERE user_id = ?', req.body.params['user_id'] ).then(results => {
             
                res.send(null);
            }).catch(error => common.sendErrorResponse(res,400, error.message));

        }).catch(error => common.sendErrorResponse(res,400, error.message));


        


    });


    app.post('/admin/enableUser', (req, res) => {
        if (req.user == null || req.user.role != 'A') {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        } else if (req.body.params['user_id'] == undefined) {
          
            common.sendErrorResponse(res, 401, 'The required user_id parameter was not supplied.');
            return;
        }
         else if (req.user.user_id == req.body.params['user_id'] || req.body.params['user_id']  == 'root') {
            common.sendErrorResponse(res, 401, 'The requested operation is not permitted.');
            return;
        }
        
        common.database.executeQuery('SELECT COUNT(*) AS CNT FROM users WHERE user_id = ? AND active = 0',req.body.params['user_id'] ).then(results => {
            if(results[0]['CNT'] == 0) {
                common.sendErrorResponse(res, 401, 'The requested user_id is not valid or is already enabled.');
            return;
            }

            common.database.executeQuery('UPDATE users SET active = 1 WHERE user_id = ?', req.body.params['user_id'] ).then(results => {
                res.send(null);
            }).catch(error => common.sendErrorResponse(res,400, error.message));

        }).catch(error => common.sendErrorResponse(res,400, error.message));


        


    });


    app.get('/admin/userbyid/:user_id', (req, res) => {
        if (req.user == null || req.user.role != 'A') {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }
        else if (req.params['user_id'] == undefined) {
            common.sendErrorResponse(res,400,'The required values were not supplied.');
            return;
        }
        else if (req.params['user_id'] == 'root') {
            common.sendErrorResponse(res, 401, 'The requested operation is not permitted.');
            return;
        }
        else {
            common.database.executeQuery('SELECT user_id, first_name,last_name,role FROM users WHERE user_id = ?', req.params['user_id'])
            .then(result => { 
                if (result.length == 0) {
                    common.sendErrorResponse(res,400,'The requested user_id is not valid.');
                    return;
                }
                else {
                     res.send(result[0]);
                }
            }).catch(error => common.sendErrorResponse(res,400,error));



        }


    });



  app.post('/admin/changePassword', (req, res) => {

    if (req.user == null || req.user.role != 'A') {
        common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
        return;
    }
    else if (req.body.params['user_id'] == undefined || req.body.params['password'] == undefined || req.body.params['password_confirmation'] == undefined) {
        common.sendErrorResponse(res,400,'The required values were not supplied.');
        return;
    }
    else if (req.params['user_id'] == 'root') {
        common.sendErrorResponse(res, 401, 'The requested operation is not permitted.');
        return;
    }
    else {
        let passwordValidator = new validator();
        let result = passwordValidator.validatePassword(req.body.params['password'],req.body.params['password_confirmation']);

        if (result != true) {
            common.sendErrorResponse(res,400,result);
        }


        common.database.executeQuery('SELECT COUNT(*) CNT FROM users WHERE user_id = ?', req.body.params['user_id']).then(result => {
            
            if (result[0].CNT == 0) {
                common.sendErrorResponse(res,400,'The user_id specified is not valid.')
                return;
            }


            var salt = bcryptjs.genSaltSync(10);
            var hash = bcryptjs.hashSync(req.body.params['password']);
            
            common.database.executeQuery('UPDATE users SET password_hash = ?, updated_by = ?, updated_datetime = NOW() WHERE user_id = ?',[hash,req.body.params['user_id'],req.user.user_name]).then(
                result => {
                    res.send(null);
                }).catch(error => common.res.sendErrorResponse(res,400,error));
            



        }).catch(error => common.sendErrorResponse(res,400,error));


       





        


        
    } 


  });


  app.put('/admin/userData', (req, res) => {

    if (req.user == null || req.user.role != 'A') {
        common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
        return;
    }

    let data = req.body;

    if (data.user == null || data.user_id == null) {
        common.sendErrorResponse(res,400,'The required values were not supplied.');
        return;
    }
    if (req.params['user_id'] == 'root') {
        common.sendErrorResponse(res, 401, 'The requested operation is not permitted.');
        return;
    }


    let adminValidator = new validator();
    let result = adminValidator.validateUser(data.user);
   
    if (result != true) {
        common.sendErrorResponse(res,400,result);
        return;
    }

  

  


        common.database.executeQuery('SELECT last_name, first_name, role FROM users WHERE user_id = ?', data.user_id)
        .then(result =>  { 
            
            if (result.length == 0) {
                common.sendErrorResponse(res,400,'The existing user ID specified does not exist.')
                return;
            }


            if (data.user_id != data.user.user_id) {
                common.database.executeQuery('SELECT COUNT(*) CNT FROM users WHERE user_id = ?',data.user.user_id)
                .then(result => {
                  
                    if (result[0]['CNT'] > 0) {
                        common.sendErrorResponse(res,400,'The user ID requested already exists.')
                        return;
                    }
                    
    
                    common.database.executeQuery('UPDATE users SET ?, updated_by = ?, updated_datetime = NOW() WHERE user_id = ?', [data.user, req.user.username, data.user_id])
                    .then(result => {
                        res.send(null);
                    }).catch(error => common.sendErrorResponse(res,400,error));
    
    
                }).catch(error => common.sendErrorResponse(res,400,error));
    
            }
            else {
                common.database.executeQuery('UPDATE users SET ?, updated_by = ?, updated_datetime = NOW() WHERE user_id = ?', [data.user, req.user.username, data.user_id])
                .then(result => {
                    res.send(null);
                }).catch(error => common.sendErrorResponse(res,400,error));
            }
    
    
        }).catch(error => common.sendErrorResponse(res,400,error));




             






   
 
           
   



  });



  app.post('/admin/userData', (req, res) => {

    if (req.user == null || req.user.role != 'A') {
        common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
        return;
    }

    let data = req.body;



    let adminValidator = new validator();
    let result = adminValidator.validateUser(data);
   
    if (result != true) {
        common.sendErrorResponse(res,400,result);
        return;
    }

  
    
  


                common.database.executeQuery('SELECT COUNT(*) CNT FROM users WHERE user_id = ?',data.user_id)
                .then(result => {
                  
                    if (result[0]['CNT'] > 0) {
                        common.sendErrorResponse(res,400,'The user ID requested already exists.')
                        return;
                    }
                    
                    data['added_by'] = req.user.username;
                    data['updated_by'] = req.user.username;
    
                    common.database.executeQuery('INSERT INTO users SET ?, added_datetime = NOW(), updated_datetime = NOW()', [data])
                    .then(result => {
                        res.send(null);
                    }).catch(error => common.sendErrorResponse(res,400,error));
    
    
                }).catch(error => common.sendErrorResponse(res,400,error));
    
           



             






   
 
           
   



  });








}