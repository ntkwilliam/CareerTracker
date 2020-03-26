const mysql = require('mysql');
let connectionAttributes = require('../globals').connectionAttributes;

getConnection = () => {
    return mysql.createConnection({
        host: connectionAttributes.DB_HOSTNAME,
        port: connectionAttributes.DB_PORT,
        user: connectionAttributes.DB_USERNAME,
        password: connectionAttributes.DB_PASSWORD,
        database: connectionAttributes.DB_DATABASE_NAME
    });
}

executeQuery = function(query, values) {
    return new Promise((resolve, reject) => { 
let connection = getConnection();



    try { 
    connection.query(query, values, (error, results, fields) => {
        if (error) {
            reject(error);
        }
        else {
        
            resolve(results);
        }
    });


        
    } catch (exception) {
        reject(exception);
    
    }
    finally {
        connection.end();
    }






})




}


initialize =  function(connectionObject) {
    this.connectionAttributes = connectionObject;


}



module.exports = {
    executeQuery, initialize, getConnection



}