const mysql = require('mysql');
var connectionAttributes;



executeQuery = function(query, values) {
    return new Promise((resolve, reject) => { 
var connection = mysql.createConnection({
    host: this.connectionAttributes.DB_HOSTNAME,
    port: this.connectionAttributes.DB_PORT,
    user: this.connectionAttributes.DB_USERNAME,
    password: this.connectionAttributes.DB_PASSWORD,
    database: this.connectionAttributes.DB_DATABASE_NAME
});



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
    executeQuery, initialize



}