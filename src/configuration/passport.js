
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const common = require('./routes/common');
const session = require('express-session');
const cookieparser = require('cookieparser');

module.exports = function (passport, app) {


    app.use(session({   
        secret: 'Cf0addafaafaa',
        resave: true,
        saveUninitialized: true
    
    
    
    }));

   



    passport.use(new LocalStrategy(
        function(username, password, done) {
           

            common.database.executeQuery('SELECT password_hash from users WHERE user_id = ? AND active = 1 AND password_hash IS NOT NULL', username).then(results => {
               if (results.length == 0) {
                done(null, false, { message : 'The user ID or password entered is not valid.  Please check your credentials and try again.'});
                return;
               }
                 var hashCompareResult = bcrypt.compareSync(password, results[0].password_hash);
                 
               
                 if (hashCompareResult == false) {
                
                     done(null, false, { message : 'The user ID or password entered is not valid.  Please check your credentials and try again.'});
                     return;
                 }
                 else {
                     done(null, { 
                         username: username
                     });
                     return;
                 }

            }).catch(error => {
             
                done(null,false, { message: 'An unexpected error has occurred:' + error.message})
                return;
            });




        }));




        passport.serializeUser(function(user, done) {
          
            done(null, user.username);
          
        });
        
        passport.deserializeUser(function(id, done) {
       
            common.database.executeQuery('SELECT role from users WHERE user_id = ? AND active = 1', id).then(results => {
               
                if (results.length == 0) {
                        done(null,null);

                }
                else {
                    done(null,{
                        username: id,
                        role: results[0].role
                    });

                }
            }).catch(error => done(null,null));
           
          
            
            });


            
app.use(passport.initialize());
app.use(passport.session());



};