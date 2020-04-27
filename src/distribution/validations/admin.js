
class AdminValidator {


validatePassword(password,passwordConfirmation) {

    let errorFound = false;
    let validationErrors = {
        password:null,
        password_confirmation: null,

    };


    if (password == null || password.trim() == "") {
        validationErrors.password = "A value is required.";
        errorFound = true;
      
    }
    else if (password.length < 8 || password.length > 15 ||!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
        validationErrors.password = "The value does not meet the minimum password requirements.";
        errorFound = true;
    }

    if (passwordConfirmation == null || passwordConfirmation.trim() == "") {
        validationErrors.password_confirmation = "A value is required.";
        errorFound = true;
    } else if (password != passwordConfirmation) {
        validationErrors.password_confirmation = "The value does not match the password value.";
        errorFound = true;
    }

    if (errorFound) {
        return validationErrors;
    }
    
   

    return true;



}

validateUser(user) {

    let errorFound = false;
   let validationErrors = {
       user_id: null,
        last_name:null,
        first_name: null,
        role: null

    };

    if (user.user_id == null || user.user_id.trim() == "") {
        validationErrors.user_id =  'A value is required.';
        errorFound = true;
    }


    if (user.last_name == null || user.last_name.trim() == "") {
        validationErrors.last_name =  'A value is required.';
        errorFound = true;
    }



    if (user.first_name == null || user.first_name.trim() == "") {
        validationErrors.first_name =  'A value is required.';
        errorFound = true;
    }

    if (user.role == null || (user.role != "A" && user.role != "U")) {
        validationErrors.role = "A valid value is required."
        errorFound = true;
    }

   
    if (errorFound == true) {
        return validationErrors;
    }


return true;


}





}

module.exports = AdminValidator;