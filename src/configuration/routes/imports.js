const fileUpload = require('express-fileupload');
const fileConvert = require('convert-excel-to-json');
module.exports = function (app) {

    app.use(fileUpload({
        createParentPath: true
    }));


    app.post('/upload', function(req, res) {

        let result = {
            error: false,
            errorMessage: null,
            rowsProcessed: 0,
        }


        try {
       var excelJson = fileConvert({
           source: req.files.file.data
       });
       
       for (var prop in excelJson.Upload[0]) {
           console.log(prop);
       }


       if (excelJson.Upload == undefined) {
        result.error = true;
        result.errorMessage = "No worksheet named 'Upload' exists in file.";
        
       } else if (excelJson.Upload[0].length != 42) {
        result.error = true;
        result.errorMessage = "The spreadsheet submitted is not in the expected format.";
           
       }    



    } catch (exception) {
        console.log(exception);

    }
       console.log(result);
    res.send(result);




    });


    }