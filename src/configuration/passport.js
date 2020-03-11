
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const session = require('express-session');
module.exports = function (passport, app) {


    app.use(session({   
        secret: "Cf0addafaafaa",
        resave: true,
        saveUninitialized: true
    
    
    
    }));




    passport.use(new LocalStrategy(
        function(username, password, done) {
           return done(null, { id: 'Scott'});
        }));




        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        
        passport.deserializeUser(function(id, done) {
            console.log(id);
           return done (null,  { 
               id: 'Scott'
           })
            
            });


            
app.use(passport.initialize());
app.use(passport.session());














};