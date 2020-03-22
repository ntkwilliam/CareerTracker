
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const common = require('./routes/common');
const session = require('express-session');
const cookieparser = require('cookieparser');
module.exports = function (passport, app) {


    app.use(session({   
        secret: "Cf0addafaafaa",
        resave: true,
        saveUninitialized: true
    
    
    
    }));

   



    passport.use(new LocalStrategy(
        function(username, password, done) {
           

            common.database.executeQuery('SELECT password_hash from users WHERE user_id = ?', username).then(results => {
                var hashCompareResult = bcrypt.compareSync(password, results[0].password_hash);
                 
                console.log(hashCompareResult);
                 if (hashCompareResult == false) {
                
                     done(null, false, { message : "The user ID or password entered is not valid.  Please check your credentials and try again."});
                 }
                 else {
                     done(null, { 
                         username: username
                     });
                 }

            }).catch(error => {
               console.log(error);
                done(null,false, { message: 'An unexpected error has occurred:' + error.message})
            });




        }));




        passport.serializeUser(function(user, done) {
            done(null, user.username);
        });
        
        passport.deserializeUser(function(id, done) {
         
           return done (null,  { 
               username: id.username
           })
            
            });


            
app.use(passport.initialize());
app.use(passport.session());










};