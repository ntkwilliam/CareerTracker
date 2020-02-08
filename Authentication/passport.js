// IMPORTS ==================================================================

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'authentication_database'
});
connection.connect();

module.exports = function(passport) {

    // SESSION SETUP ========================================================

    // Serialize the user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // SIGNUP ===============================================================
    
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // Check if username exists in database
            connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
                if (err) {
                    return done(err); // Error
                }
                if (rows.length) {
                    return done(null, false, {message: 'Username already exists'}); // Username already exists
                } 
                else {
                    // Create user
                    const newUser = {
                        id: Date.now().toString(),
                        username: username,
                        password: bcrypt.hashSync(password, 10)  // Hash password
                    };
                    // Insert user into database
                    const insertQuery = "INSERT INTO users ( id, username, password ) values (?,?,?)";
                    //connection.connect();
                    connection.query(insertQuery, [newUser.id, newUser.username, newUser.password], function(err, rows) {
                        return done(null, newUser);
                    });
                }
            });
        })
    );

    // LOGIN ===============================================================

    passport.use('local-login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // Search for submitted login information in database
            connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows){ 
                if (err) {
                    return done(err); // Error
                }
                if (!rows.length) {
                    return done(null, false, {message: 'Username not found'}); // Username not found
                }
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    return done(null, false, {message: 'Password incorrect'}); // Password incorrect
                }
                return done(null, rows[0]); // User found
            });
        })
    );

};