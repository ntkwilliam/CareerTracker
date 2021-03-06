class GraduateSchoolValidator {

  
    isBlankValue(value) {
      if(!value) {
        return true
      }
      else if (typeof(value) == 'string') {
      return ((value || "").trim() == "");
      }
      else {
        return value == 0;
      }
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
          
        if (regex != null && !(value.toString()).match(regex)) {
          
          this.validationErrors[fieldName] = 'The value is not in a valid format.';
          this.errorsExist  = true;
          return [true, false];
        }
        else 
        {
          return [true, true];
        }
      }
    }
  
    validateGraduateSchoolRecord(values) {


      this.validationErrors = {
        school_name: null,
        contact_name: null,
        address_line_1: null,
        address_line_2: null,
        city: null,
        state: null,
        zip_code: null,
        phone_number: null,
        email_address: null
        }
      
        this.errorsExist = false;


      this.validateField('school_name', values['school_name'], true, /^[A-Za-z-' ]+$/);
      if (this.validateField('address_line_1', values['address_line_1'], false, /^[0-9A-Za-z-'., #]{1,32}$/)[0]
      || this.validateField('address_line_2', values['address_line_2'], false, /^[0-9A-Za-z-'., #]{1,32}$/)[0]) 
      {
        this.validateField('address_line_1', values['address_line_1'], true, /^[0-9A-Za-z-'., #]{1,32}$/);
        this.validateField('address_line_2', values['address_line_2'], false, /^[0-9A-Za-z-'., #]{1,32}$/);
        this.validateField('city', values['city'], true, /^[A-Za-z-' .]{1,25}$/);
        this.validateField('state', values['state'], true, /^[A-Z]{2}$/);
        this.validateField('zipcode', values['zipcode'], true, /^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$/);
      }   
      else if (this.validateField(['city'], values['city'], false, /^[A-Za-z-' .]{1,25}$/)[0]) {
        this.validateField('address_line_1', values['address_line_1'], false, /^[0-9A-Za-z-'., #]{1,32}$/);
        this.validateField('state', values['state'], true, /^[A-Z]{2}$/);
        this.validateField('zipcode', values['zipcode'], false, /^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$/);
      }
      else if (this.validateField(['state'], values['state'], false, /^[A-Za-z-' ]{2}$/)[0]) {
        this.validateField('address_line_1', values['address_line_1'], false, /^[0-9A-Za-z-'., #]{1,32}$/);
        this.validateField('city', values['city'], true, /^[A-Za-z-' .]{1,25}$/);
        this.validateField('zipcode', values['zipcode'], false, /^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$/);
      }
      else if (this.validateField(['zipcode'], values['zipcode'], false, /^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$/)[0]) {
        this.validateField('address_line_1', values['address_line_1'], false, /^[0-9A-Za-z-'., #]{1,32}$/);
        this.validateField('city', values['city'], true, /^[A-Za-z-' .]{1,25}$/);
        this.validateField('state', values['state'], true, /^[A-Z]{2}$/);
      }
     
      this.validateField('phone_number', values['phone_number'], false, /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/);
      this.validateField('email_address', values['email_address'], false, /^[a-zA-Z0-9][a-zA-Z0-9._!#$%&'*+\-/=?^_`{|]+[a-zA-Z0-9]@[a-zA-Z0-9.\-]+\.[a-zA-Z]+$/)
        this.validateField('contact_name', values['contact_name'], false, /^[A-Za-z-' ]+$/);
     
  
  
      return [this.errorsExist, this.validationErrors];
  
    }
  
    validateChildRecord(recordType, values) {
      
      this.validationErrors = {
        school_name: null,
        contact_name: null,
        address_line_1: null,
        address_line_2: null,
        city: null,
        state: null,
        zip_code: null,
        phone_number: null,
        email_address: null
        }
      
        this.errorsExist = false;

      switch (recordType) {
     
  
           case 'comments':
            this.validateField('entity_id', values['entity_id'], true, /^[0-9]+$/);
            this.validateField('entity_type', values['entity_type'], true, /^G$/);
            this.validateField('comment', values['comment'], true, /^[\s\S]{1,1000}$/);
           break;


      }

        
      return [this.errorsExist, this.validationErrors];
    }
  
  
  
  
  
    }
  

    module.exports = GraduateSchoolValidator;