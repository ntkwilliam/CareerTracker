import { AlumniValidator } from '../records/alumni/alumni.validator';

describe('alumni data validation', () => {
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

    it('Test address line 1 null when city supplied', () => {
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

    it('Test zipcode null when city supplied', () => {
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
        expect(result[1]['mailing_address_zipcode']).toBe('A value is required.');
        
        
    });


    it('Test address line 1 null when state supplied', () => {
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
        expect(result[1]['mailing_address_line_1']).toBe('A value is required.');
        
        
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

    it('Test zipcode null when state supplied', () => {
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
        expect(result[1]['mailing_address_zipcode']).toBe('A value is required.');
        
        
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
        expect(result[1]['mailing_address_line_1']).toBe('A value is required.');
        
        
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



});