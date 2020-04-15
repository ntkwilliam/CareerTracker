

// Configure APPLICATION_PORT to the port on which the application should run.
const APPLICATION_PORT = 8080;
// Configure ROOT_DIRECTORY to HTTP hosting path if not hosted at root of localhost
const HTTP_ROOT = 'http://localhost';
// Configure database connection attributes as needed if MySQL is not running on local host or alternative database/username/password/port configuration is required.
const DB_HOSTNAME = 'localhost';
const DB_PORT = 3306;
const DB_DATABASE_NAME = 'careertracker'
const DB_USERNAME = 'careertracker'
const DB_PASSWORD = '3ig7turh?'
let connectionAttributes = {
    DB_DATABASE_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, APPLICATION_PORT
};


module.exports = {connectionAttributes, HTTP_ROOT, APPLICATION_PORT};