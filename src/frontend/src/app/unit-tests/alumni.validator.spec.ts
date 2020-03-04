import { AlumniValidator } from '../records/alumni/alumni.validator';

describe('alumni general data validation', () => {
    it('Test last_name null', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
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

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['last_name']).toBe('A value is required.');
        

    });
    it('Test first_name null', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
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

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['first_name']).toBe('A value is required.');
        

    });

    
    it('Test city null when address line 1 supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '123 Apple Ln',
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe('A value is required.');
        

        
        
    });

    it('Test state null when address line 1 supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '123 Apple Ln',
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_state']).toBe('A value is required.');
        

        
        
    });

    it('Test zip code null when address line 1 supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '123 Apple Ln',
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_zipcode']).toBe('A value is required.');
        

        
        
    });


    it('Test address line 1 null when address line 2 supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: '123 Apple Ln.',
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_1']).toBe('A value is required.');
        
        
    });

    it('Test address line 1 null when address line 2 supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: null,
            mailing_address_line_2: 'Test',
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_1']).toBe('A value is required.');
        
        
    });


    it('Test state null when city supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: null,
            mailing_address_line_2: null,
            mailing_address_city: 'Test',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_state']).toBe('A value is required.');
        
        
    });

   



    it('Test city null when state supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: null,
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: 'IN',
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe('A value is required.');
        
        
    });


    it('Test address line 1 null when zipcode supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: null,
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: '47150',
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_1']).toBe(undefined);
        
        
    });

    it('Test city null when zipcode supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: null,
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: '47150',
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe('A value is required.');
        
        
    });

    it('Test state null when zipcode supplied', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: null,
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: '47150',
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_state']).toBe('A value is required.');
        
        
    });

    it('Test mailing address line 1 format when format erroneous', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '232* Zebra Ln.',
            mailing_address_line_2: null,
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_1']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test mailing address line 2 format when format erroneous', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: '242& Apple Ln.',
            mailing_address_city: null,
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_2']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test city format when format erroneous - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: 'New% ALbany',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test city format when format erroneous - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: 'New23 ALbany',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe('The value is not in a valid format.');
        
        
    });


    it('Test state format when format erroneous - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: 'IND',
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_state']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test state format when format erroneous - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: 'A0',
            mailing_address_zipcode: null,
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_state']).toBe('The value is not in a valid format.');
        
        
    });


    it('Test zipcode format when format erroneous - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: '2323',
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_zipcode']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test zipcode format when format erroneous - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: 'ABCDE',
            phone_number: null,
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_zipcode']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test phone number when format erroneous - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '2393093202',
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['phone_number']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test phone number when format erroneous - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '(502) 932-A932',
            email_address: null
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['phone_number']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test email address when format erroneous - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: 'j smith@aol.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test email address when format erroneous - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: 'jsmith@aol'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test email address when format erroneous - test 3', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: 'jaol.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test email address when format erroneous - test 4', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: '$fmsio@msn.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe('The value is not in a valid format.');
        
        
    });

    it('Test email address when format erroneous - test 5', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: 'ffmsio-@msn.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe('The value is not in a valid format.');
        
        
    });


  


    it('Test last name when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: 'Smith',
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['last_name']).toBe(undefined);
        
        
    });

    it('Test last name when valid - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: 'Smith-Johnson',
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['last_name']).toBe(undefined);
        
        
    });

    it('Test last name when valid - test 3', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: 'La\' Mar',
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['last_name']).toBe(undefined);
        
        
    });

    it('Test first name when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: 'John',
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['first_name']).toBe(undefined);
        
        
    });

    it('Test first name when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: 'Sally-Sue',
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['first_name']).toBe(undefined);
        
        
    });

    it('Test first name when valid - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: 'D\'Angelo',
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['first_name']).toBe(undefined);
        
        
    });

    it('Test mailing address line 1 when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St.',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_1']).toBe(undefined);
        
        
    });

    it('Test mailing address line 1 when valid - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_1']).toBe(undefined);
        
        
    });


    it('Test mailing address line 2 when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St.',
            mailing_address_line_2: 'Basement',
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_2']).toBe(undefined);
        
        
    });

    it('Test mailing address line 2 when valid - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: 'Apt. #2',
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_line_2']).toBe(undefined);
        
        
    });


    it('Test city when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'New Albany',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe(undefined);
        
        
    });


    it('Test city when valid - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'Test-Test',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe(undefined);
        
        
    });


    it('Test city when valid - test 3', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'St. Paul',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_city']).toBe(undefined);
        
        
    });

    it('Test state when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'St. Paul',
            mailing_address_state: 'MN',
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_state']).toBe(undefined);
        
        
    });


    it('Test zip code when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'St. Paul',
            mailing_address_state: 'MN',
            mailing_address_zipcode: '12345',
            phone_number: '',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['mailing_address_zipcode']).toBe(undefined);
        
        
    });

    it('Test phone number when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'St. Paul',
            mailing_address_state: 'MN',
            mailing_address_zipcode: '12345',
            phone_number: '(502) 555-5529',
            email_address: ''
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['phone_number']).toBe(undefined);
        
        
    });

    it('Test email address when valid - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'St. Paul',
            mailing_address_state: 'MN',
            mailing_address_zipcode: '12345',
            phone_number: '(502) 555-5529',
            email_address: 'sshrout@gmail.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe(undefined);
        
        
    });


    it('Test email address when valid - test 2', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'St. Paul',
            mailing_address_state: 'MN',
            mailing_address_zipcode: '12345',
            phone_number: '(502) 555-5529',
            email_address: 'jsmith92@aif.afif.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe(undefined);
        
        
    });



    it('Test email address when valid - test 3', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: '',
            first_name: '',
            mailing_address_line_1: '103 Spring St. #42',
            mailing_address_line_2: '',
            mailing_address_city: 'St. Paul',
            mailing_address_state: 'MN',
            mailing_address_zipcode: '12345',
            phone_number: '(502) 555-5529',
            email_address: 'ssh$ro$ut_02@gmail.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe(undefined);
        
        
    });

    it('Test email address when format erroneous - test 4', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: null,
            first_name: null,
            mailing_address_line_1: '',
            mailing_address_line_2: null,
            mailing_address_city: '',
            mailing_address_state: null,
            mailing_address_zipcode: null,
            phone_number: '',
            email_address: 'ffmsio@this-is-a-test.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(true);
        expect(result[1]['email_address']).toBe(undefined);
        
        
    });


    it('Test valid record - test 1', () => {
        let validator = new AlumniValidator();
        let alumniRecord = {
            last_name: 'Smith',
            first_name: 'John',
            mailing_address_line_1: '101 Main St.',
            mailing_address_line_2: 'Unit 2',
            mailing_address_city: 'Louisville',
            mailing_address_state: 'KY',
            mailing_address_zipcode: '40202',
            phone_number: '(502) 555-2323',
            email_address: 'jsmith@hotmail.com'
        }

        let result = validator.validateAlumniRecord(alumniRecord);
        expect(result[0]).toBe(false);
        expect(result[1]['last_name']).toBe(undefined);
        expect(result[1]['first_name']).toBe(undefined);
        expect(result[1]['mailing_address_line_1']).toBe(undefined);
        expect(result[1]['mailing_address_line_2']).toBe(undefined);
        expect(result[1]['mailing_address_city']).toBe(undefined);
        expect(result[1]['mailing_address_state']).toBe(undefined);
        expect(result[1]['mailing_address_zipcode']).toBe(undefined);
        expect(result[1]['phone_number']).toBe(undefined);
        expect(result[1]['email_address']).toBe(undefined);
        
        
    });






});

describe('alumni child data validation', () => {
    it('Test alumni_degrees diploma description null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            diploma_description: null,
            graduation_term_code: null
        }

        let result = validator.validateChildRecord('alumni_degrees',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['diploma_description']).toBe('A value is required.');
        

    });



    it('Test alumni_degrees graduation_term_code null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            diploma_description: null,
            graduation_term_code: null
        }

        let result = validator.validateChildRecord('alumni_degrees',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['graduation_term_code']).toBe('A value is required.');
        

    });
        it('Test alumni_degrees alumnus_id null', () => {
            let validator = new AlumniValidator();
            let childRecord = {
                alumnus_id: null,
                diploma_description: null,
                graduation_term_code: null
            }
    
            let result = validator.validateChildRecord('alumni_degrees',childRecord );
            expect(result[0]).toBe(true);
            expect(result[1]['alumnus_id']).toBe('A value is required.');
        

    });

    it('Test alumni_degrees graduation_term_code invalid format', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            diploma_description: null,
            graduation_term_code: 'A1332'
        }

        let result = validator.validateChildRecord('alumni_degrees',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['graduation_term_code']).toBe('The value is not in a valid format.');
        


    });
 

    it('Test alumni_degrees alumnus_id invalid format', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: 'A242',
            diploma_description: null,
            graduation_term_code: null
        }

        let result = validator.validateChildRecord('alumni_degrees',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['alumnus_id']).toBe('The value is not in a valid format.');
    

});

    it('Test alumni_degrees valid record', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: 2,
            diploma_description: 'B.S., Computer Science',
            graduation_term_code: '3233'
        }

        let result = validator.validateChildRecord('alumni_degrees',childRecord );
        expect(result[0]).toBe(false);
        expect(result[1]['graduation_term_code']).toBe(undefined);
        expect(result[1]['diploma_description']).toBe(undefined);
        expect(result[1]['alumnus_id']).toBe(undefined);

    });





    it('Test alumni_employments employer_id null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            employer_id: 0,
            job_title: null
        }

        let result = validator.validateChildRecord('alumni_employments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['employer_id']).toBe('A value is required.');
        

    });

    it('Test alumni_employments job_title null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            employer_id: 0,
            job_title: null
        }

        let result = validator.validateChildRecord('alumni_employments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['job_title']).toBe(undefined);
        

    });

    it('Test alumni_employments job_title null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: null,
            employer_id: 0,
            job_title: null
        }

        let result = validator.validateChildRecord('alumni_employments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['alumnus_id']).toBe('A value is required.');
        

    });
  
  
    it('Test alumni_employments employer_id invalid', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            employer_id: 'AFV3',
            job_title: null
        }

        let result = validator.validateChildRecord('alumni_employments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['employer_id']).toBe('The value is not in a valid format.');
        

    });




    it('Test alumni_employments job_title invalid', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            employer_id: 1,
            job_title: 'test%#$$@'
        }

        let result = validator.validateChildRecord('alumni_employments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['job_title']).toBe('The value is not in a valid format.');
        

    });
  
    it('Test alumni_employments alumnus_id invalid', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: 'A42',
            employer_id: 1,
            job_title: 'test%#$$@'
        }

        let result = validator.validateChildRecord('alumni_employments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['alumnus_id']).toBe('The value is not in a valid format.');
        

    });
  




    it('Test alumni_employments valid record', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: 2,
            employer_id: 1,
            job_title: 'Programmer Level 1'
        }

        let result = validator.validateChildRecord('alumni_employments',childRecord );
        expect(result[0]).toBe(false);
        expect(result[1]['employer_id']).toBe(undefined);
        expect(result[1]['job_title']).toBe(undefined);
        

    });
  
    it('Test alumni_graduate_schools  alumnus_id null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: null,
            graduate_school_id: null,
            
        }

        let result = validator.validateChildRecord('alumni_graduate_schools',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['alumnus_id']).toBe('A value is required.');
        
        

    });
  

    it('Test alumni_graduate_schools  graduate school null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            graduate_school_id: null,
            
        }

        let result = validator.validateChildRecord('alumni_graduate_schools',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['graduate_school_id']).toBe('A value is required.');
        
        

    });
  

    it('Test alumni_graduate_schools invalid graduate school', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            graduate_school_id: 'A32FF',
            
        }

        let result = validator.validateChildRecord('alumni_graduate_schools',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['graduate_school_id']).toBe('The value is not in a valid format.');
        
        

    });

    it('Test alumni_graduate_schools invalid alumnus_id', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: 'A42',
            graduate_school_id: 'A32FF',
            
        }

        let result = validator.validateChildRecord('alumni_graduate_schools',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['alumnus_id']).toBe('The value is not in a valid format.');
        
  
    });



    it('Test alumni_graduate_schools valid record', () => {
       
        let validator = new AlumniValidator();
        let childRecord = {
            alumnus_id: 2,
            graduate_school_id: 31,
            
        }

        let result = validator.validateChildRecord('alumni_graduate_schools',childRecord );
        expect(result[0]).toBe(false);
        expect(result[1]['graduate_school_id']).toBe(undefined);
        
        

    });

    
    it('Test comments entity type null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            entity_type: null,
            entity_id: null,
            comment: null
            
        }

        let result = validator.validateChildRecord('comments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['entity_type']).toBe('A value is required.');
        
        

    });

    it('Test comments entity id null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            entity_type: null,
            entity_id: null,
            comment: null
            
        }

        let result = validator.validateChildRecord('comments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['entity_id']).toBe('A value is required.');
        
        

    });

    it('Test comments comment null', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            entity_type: null,
            entity_id: null,
            comment: null
            
        }

        let result = validator.validateChildRecord('comments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['comment']).toBe('A value is required.');
        
        

    });

    it('Test comments entity type invalid', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            entity_type: 332,
            entity_id: null,
            comment: null
            
        }

        let result = validator.validateChildRecord('comments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['entity_type']).toBe('The value is not in a valid format.');
        
        

    });

    it('Test comments entity id invalid', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            entity_type: 332,
            entity_id: 'Aff3',
            comment: null
            
        }

        let result = validator.validateChildRecord('comments',childRecord );
        expect(result[0]).toBe(true);
        expect(result[1]['entity_id']).toBe('The value is not in a valid format.');
        
        

    });

    it('Test comments valid record', () => {
        let validator = new AlumniValidator();
        let childRecord = {
            
            entity_type: 'A',
            entity_id: 32,
            comment: 'FFAvsgw4g3..3.3,$'
            
        }

        let result = validator.validateChildRecord('comments',childRecord );
        expect(result[0]).toBe(false);
        expect(result[1]['entity_id']).toBe(undefined);
        expect(result[1]['entity_type']).toBe(undefined);
        expect(result[1]['comment']).toBe(undefined);
        
        

    });


});