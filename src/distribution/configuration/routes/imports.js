const fileUpload = require('express-fileupload');
const fileConvert = require('convert-excel-to-json');
const alumniValidator = require('../../validations/alumni')
const database = require('./database');
const mappedFields = [
     { 
         fieldIdentifier: 'Primary Last Name',
         required: true,
         destinationEntity: 'alumni',
         destinationField: 'last_name',
         columnID: null,
         specialProcessing: false
     },
     { 
        fieldIdentifier: 'Primary First Name',
        required: true,
        destinationEntity: 'alumni',
        destinationField: 'first_name',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Primary Middle Name',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'middle_name',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Expected Graduation Term Code',
        required: true,
        destinationEntity: 'alumni_degrees',
        destinationField: 'graduation_term_code',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Plan Diploma Description',
        required: true,
        destinationEntity: 'alumni_degrees',
        destinationField: 'diploma_description',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Mailing Address Line1',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'mailing_address_line_1',
       columnID: null,
       specialProcessing: false
    }
    , { 
        fieldIdentifier: 'Mailing Address Line2',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'mailing_address_line_2',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Mailing Address Line3',
        required: false,
        destinationEntity: 'alumni',
        destinationField: null,
       columnID: null,
       specialProcessing: true
    },
    { 
        fieldIdentifier: 'Mailing Address Line4',
        required: false,
        destinationEntity: 'alumni',
        destinationField: null,
       columnID: null,
       specialProcessing: true
    }
    , { 
        fieldIdentifier: 'Mailing Address City',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'mailing_address_city',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Mailing Address State Code',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'mailing_address_state',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Mailing Address Zip Code',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'mailing_address_zipcode',
       columnID: null,
       specialProcessing: true
    },{ 
        fieldIdentifier: 'Other Email Address',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'email_address',
       columnID: null,
       specialProcessing: false
    },
    { 
        fieldIdentifier: 'Home Address Phone Nbr',
        required: false,
        destinationEntity: 'alumni',
        destinationField: 'phone_number',
       columnID: null,
       specialProcessing: true
    }
   
];

module.exports = function (app) {

    app.use(fileUpload({
        createParentPath: true
    }));


    mapFields = (inputFields) => {
        let fieldCount = Object.keys(inputFields).length;
       
        for (let i = 0; i < fieldCount; i++) {
         
            let position = mappedFields.findIndex(item => item.fieldIdentifier == inputFields[Object.keys(inputFields)[i]]);
           
            if (position != -1 && mappedFields[position].columnID == null) {
               
                mappedFields[position].columnID = Object.keys(inputFields)[i];
            }

        }
        return mappedFields.findIndex(item => item.columnID == null && item.required) == -1;
    }

    applySpecialProcessing = (field, value, outputRecord) => {
            switch (field.fieldIdentifier) {
                case 'Home Address Phone Nbr':
                value = value.replace(/\D/g, '');
                if (value.length == 10) {
                    value = '(' + value.substring(0,3) + ') ' + value.substring(3,6) + '-' + value.substring(6,10);
                    outputRecord[field.destinationEntity][field.destinationField] = value;
                }
                break;

                case 'Mailing Address Zip Code':
                    value = value.replace(/\D/g, '');
                    if (value.length == 5) {
                        outputRecord[field.destinationEntity][field.destinationField] = value;
                    } else if (value.length == 9) {
                        outputRecord[field.destinationEntity][field.destinationField] = value.substring(0,5) + '-' + value.substring(5,10);
                    }
                break;

                case 'Mailing Address Line4':
                case 'Mailing Address Line3':
                 outputRecord.alumni.mailing_address_line_2 == undefined ? outputRecord[field.destinationEntity][field.destinationField] :
                 outputRecord.alumni.mailing_address_line_2 += ' ' + outputRecord[field.destinationEntity][field.destinationField];

                break;




            }
    }

    readFileData = (inputData) => {
        let records = [];

        let specifiedFields = mappedFields.filter(item => item.columnID != null);
        for (let i = 1; i < inputData.length; i++) {
            let newRecord = {
                alumni: {},
                alumni_degrees: {
                    alumnus_id: 1
                },
                row_id: i + 1
            };

            for (let j = 0; j < specifiedFields.length; j++) {
          
               let value =  (inputData[i][specifiedFields[j].columnID] || '').toString().trim(); 
               if (value != '') {
                if (specifiedFields[j].specialProcessing) {
                    applySpecialProcessing(specifiedFields[j], value, newRecord);
                } else {
                    newRecord[specifiedFields[j].destinationEntity][specifiedFields[j].destinationField] = value;
                }
               }
            }
            records.push(newRecord);

        }
        return records;
    }


    validateItems = (items) => {
        let validationErrors = [];
        items.forEach(item => {
        let currentAlumniValidator = new alumniValidator();
        let currentValidationError = {
            validationErrors: []
        };
    
         currentAlumniValidator.validateAlumniRecord(item.alumni);
        let [currentValidationErrorsExist,currentValidationErrors] = currentAlumniValidator.validateChildRecord('alumni_degrees', item.alumni_degrees);
        if (currentValidationErrorsExist) { 
            currentValidationError['last_name'] = item.alumni.last_name;
            currentValidationError['first_name'] = item.alumni.first_name;
            currentValidationError['row_id'] = item.row_id;
         
            Object.keys(currentValidationErrors).forEach(key => {
                currentValidationError.validationErrors.push( {
                    field: key,
                    message: currentValidationErrors[key]
                })
            })
       
            validationErrors.push(currentValidationError);
        };

    });
    return [validationErrors.length > 0, validationErrors];
    }



    app.post('/upload', function(req, res) {

        if (req.user == null) {
            common.sendErrorResponse(res, 401, 'Unauthorized use not permitted');
            return;
        }
     
        let processCount = 0;
        let result = {
            error: false,
            errorType: null,
            errorMessage: null,
            data: null,
            rowsProcessed: 0,
        }
        let fieldData = [];


        
       let excelJson = fileConvert({
           source: req.files.file.data
       });

     
       
      


       if (excelJson.Upload == undefined) {
        result.error = true;
        result.errorType = 'other';
        result.errorMessage = 'No worksheet named \'Upload\' exists in file.';
        res.send(result);
       } else if (excelJson.Upload.length == 0) {
        result.error = true;
        result.errorType = 'other';
        result.errorMessage = 'No data found in worksheet.';
        res.send(result);
       }  else if  (mapFields(excelJson.Upload[0]) == false) {
        result.error = true;
        result.errorType = 'fields';
        result.errorMessage = 'Required columns were not found in the worksheet:';
        let missingFields = [];
        mappedFields.forEach(item => {
           
            if (item.columnID == null && item.required) {
            
                    missingFields.push( item.fieldIdentifier);
                    
            }

        });
        result.data = missingFields;
        res.send(result);
       } else {

        let fileContents = readFileData(excelJson.Upload);
        let [validationErrorsExist, validationErrors] = validateItems(fileContents);
   
        if (validationErrorsExist) {
            result.error = true;
            result.errorType = 'data';
            result.data = validationErrors;
            res.send(result);
        }
        else {
            
  
           let processUser = req.user.username + '/IMPORT';
            let dbConnection = database.getConnection();
            fileContents.forEach(item => {
            dbConnection.beginTransaction(function(error)  {
           
                item.alumni.added_by = item.alumni.updated_by = processUser;
                dbConnection.query('INSERT INTO alumni SET ?, added_datetime = NOW(), updated_datetime = Now()', item.alumni, 
                (alumni_errors,alumni_results,alumni_fields) => {
                      
                        if (alumni_errors) {
                            
                            return dbConnection.rollback(function() {
                                result.error = true;
                                result.errorType = 'processing';
                               result.err = err;
                               res.send(result);
                            });
                        }
                       

                        item.alumni_degrees.alumnus_id = alumni_results.insertId;
                        item.alumni_degrees.added_by = item.alumni_degrees.updated_by = processUser;
                        dbConnection.query('INSERT INTO alumni_degrees SET ?, added_datetime = NOW(), updated_datetime = Now()', item.alumni_degrees, 
                (degree_errors,degree_results,degree_fields) => {
                    if (degree_errors) {
                       
                        
                        return dbConnection.rollback(function() {
                            result.error = true;
                            result.errorType = 'processing';
                           result.err = err;
                           res.send(result);
                        });

                    }
                   
                    
                        

                });





                });





        });
        processCount++;
    });

    dbConnection.commit(function(err) {
      
        if (err) {
          return dbConnection.rollback(function() {
            result.error = true;
            result.errorType = 'processing';
           result.err = err;
           res.send(result);
          });
          
        }
        result.rowsProcessed = fileContents.length;
       result.success = true;
        res.send(result); 
      
        });

       

        }




    }
    




    });


    }