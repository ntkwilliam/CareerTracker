 class AlumniValidator {

     validationErrors = {
      last_name: null,
      first_name: null,
      mailing_address_line_1: null,
      mailing_address_line_2: null,
      mailing_address_city: null,
      mailing_address_state: null,
      mailing_address_zipcode: null,
      phone_number: null,
      email_address: null
    }
  
     errorsExist = false;
  
    isBlankValue(value) {
      return ((value || "").trim() == "");
    }
  
    validateField(fieldName, value, required, regex) {
      if (this.isBlankValue(value)) {
        if (required) {
        this.validationErrors[fieldName] = 'A value is required.';
        this.errorsExist  = true;
        return [false, true];
        }
        else 
        {
          return [false, false];
        }
      }
      else {
  
        if (regex != null && !value.match(regex)) {
          console.log(value);
          this.validationErrors[fieldName] = 'The value is not in a valid format';
          this.errorsExist  = true;
          return [true, false];
        }
        else 
        {
          return [true, true];
        }
      }
    }
  
    validateAlumniRecord(values) {
      this.validateField('last_name', values['last_name'], true, /^[A-Za-z-' ]+$/);
      this.validateField('first_name', values['first_name'], true, /^[A-Za-z-' ]+$/);
      if (this.validateField('mailing_address_line_1', values['mailing_address_line_1'], false, /^[0-9A-Za-z-'., ]{1,32}$/)[0]
      || this.validateField('mailing_address_line_2', values['mailing_address_line_2'], false, /^[0-9A-Za-z-'., ]{1,32}$/)[0]) 
      {
        this.validateField('mailing_address_line_1', values['mailing_address_line_1'], true, /^[0-9A-Za-z-'., ]{1,32}$/);
        this.validateField('mailing_address_line_2', values['mailing_address_line_2'], false, /^[0-9A-Za-z-'., ]{1,32}$/);
        this.validateField('mailing_address_city', values['mailing_address_city'], true, /^[A-Za-z-' ]{1,25}$/);
        this.validateField('mailing_address_state', values['mailing_address_state'], true, /^[A-Z]{2}$/);
        this.validateField('mailing_address_zipcode', values['mailing_address_zipcode'], true, /^[0-9]{5}$/);
      }   
      else if (this.validateField(['mailing_address_city'], values['mailing_address_city'], false, /^[A-Za-z-' ]{1,25}$/)[0]) {
        this.validateField('mailing_address_line_1', values['mailing_address_line_1'], true, /^[0-9A-Za-z-'., ]{1,32}$/);
        this.validateField('mailing_address_state', values['mailing_address_state'], true, /^[A-Z]{2}$/);
        this.validateField('mailing_address_zipcode', values['mailing_address_zipcode'], true, /^[0-9]{5}$/);
      }
      else if (this.validateField(['mailing_address_state'], values['mailing_address_state'], false, /^[A-Za-z-' ]{2}$/)[0]) {
        this.validateField('mailing_address_line_1', values['mailing_address_line_1'], true, /^[0-9A-Za-z-'., ]{1,32}$/);
        this.validateField('mailing_address_city', values['mailing_address_city'], true, /^[A-Za-z-' ]{1,25}$/);
        this.validateField('mailing_address_zipcode', values['mailing_address_zipcode'], true, /^[0-9]{5}$/);
      }
      else if (this.validateField(['mailing_address_zipcode'], values['mailing_address_zipcode'], false, /^[0-9]{5}$/)[0]) {
        this.validateField('mailing_address_line_1', values['mailing_address_line_1'], true, /^[0-9A-Za-z-'., ]{1,32}$/);
        this.validateField('mailing_address_city', values['mailing_address_city'], true, /^[A-Za-z-' ]{1,25}$/);
        this.validateField('mailing_address_state', values['mailing_address_state'], true, /^[A-Z]{2}$/);
      }
     
      this.validateField('phone_number', values['phone_number'], false, /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/);
      this.validateField('email_address', values['email_address'], false, /^[a-zA-Z-0-9._]+@[a-zA-Z-0-9._]+.[a-zA-Z]+/)
  
  
  
      return [this.errorsExist, this.validationErrors];
  
    }
  
  
    validateChildRecord(recordType, values) {
      switch (recordType) {
        

           case 'alumni_degrees':
            this.validateField('alumnus_id', values['alumnus_id'], true, /^[0-9]+$/);
            this.validateField('diploma_description', values['diploma_description'], true, /^[A-Za-z-',. ]{1,100}$/);
            this.validateField('graduation_term_code', values['graduation_term_code'], true, /^[0-9]{4,5}$/);
             break;
  
  
             case 'alumni_employments':
              this.validateField('alumnus_id', values['alumnus_id'], true, /^[0-9]+$/);
              this.validateField('employer_id', values['employer_id'], true, /^[0-9]+$/);
              this.validateField('job_title', values['job_title'], false, /^[A-za-z-'0-9, ]{0,45}$/);
             break;
    
             case 'alumni_graduate_schools':
              this.validateField('alumnus_id', values['alumnus_id'], true, /^[0-9]+$/);
              this.validateField('graduate_school_id', values['graduate_school_id'], true, /^[0-9]+$/);
            
             break;
    
             case 'comments':
              this.validateField('entity_id', values['entity_id'], true, /^[0-9]+$/);
              this.validateField('entity_type', values['entity_type'], true, /^A$/);
              this.validateField('comment', values['comment'], true, /^[\s\S]{1,1000}$/);
             break;
  





      }

        
      return [this.errorsExist, this.validationErrors];
    
  
  
  
  
  
    }


 }
  
    module.exports = AlumniValidator;

  