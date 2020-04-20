import { EmployerValidator} from '../records/employers/employer.validator';


describe('employer data validation', () => {
    it('Test employer name null', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: null,
            contact_name: null,
            address_line_1: null,
            address_line_2: null,
            city: null,
            state: null,
            zipcode: null,
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['employer_name']).toBe('A value is required.');
        




    });

    it('Test contact name null', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: null,
            city: null,
            state: null,
            zipcode: null,
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['contact_name']).toBe(undefined);


    });


    it('Test address line specified / city, state, zip null', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Main St.',
            address_line_2: null,
            city: null,
            state: null,
            zipcode: null,
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['city']).toBe('A value is required.');
        expect(validationErrors[1]['state']).toBe('A value is required.');
        expect(validationErrors[1]['zipcode']).toBe('A value is required.');


    });


    it('Test address line specified / state, zip null', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Main St.',
            address_line_2: null,
            city: 'Test',
            state: null,
            zipcode: null,
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['state']).toBe('A value is required.');
        expect(validationErrors[1]['zipcode']).toBe('A value is required.');


    });

    it('Test address line specified /  zip null', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Main St.',
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: null,
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['zipcode']).toBe('A value is required.');


    });

    it('Test invalid state code (more than 2 characters)', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Main St.',
            address_line_2: null,
            city: 'Test',
            state: 'IND',
            zipcode: '47150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['state']).toBe('The value is not in a valid format.');


    });



    it('Test invalid state code (less than 2 characters)', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Main St.',
            address_line_2: null,
            city: 'Test',
            state: 'I',
            zipcode: '47150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['state']).toBe('The value is not in a valid format.');


    });

    it('Test city and state with no address line 1 or zip (allowable)', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: null,
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['address_line_1']).toBe(undefined);
        expect(validationErrors[1]['city']).toBe(undefined);
        expect(validationErrors[1]['state']).toBe(undefined);
        expect(validationErrors[1]['zipcode']).toBe(undefined);


    });

    it('Test address line 2 with no address line 1', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['address_line_1']).toBe('A value is required.');


    });


    it('Test zip code - invalid format - test 1', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '4F150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['zipcode']).toBe('The value is not in a valid format.');


    });


    it('Test zip code - invalid format - test 2', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '4150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['zipcode']).toBe('The value is not in a valid format.');


    });

    
    it('Test zip code - invalid format - test 3', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '441504',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['zipcode']).toBe('The value is not in a valid format.');


    });

    it('Test zip code - valid format', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Apple St.',
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: '44150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['zipcode']).toBe(undefined);


    });

    it('Test full address - valid format - test 1', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Apple St.',
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: '44150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['address_line_1']).toBe(undefined);
        expect(validationErrors[1]['address_line_2']).toBe(undefined);
        expect(validationErrors[1]['city']).toBe(undefined);
        expect(validationErrors[1]['state']).toBe(undefined);
        expect(validationErrors[1]['zipcode']).toBe(undefined);

    });


    it('Test full address - valid format - test 2', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: '101 Apple St.',
            address_line_2: 'Apt 101',
            city: 'Test',
            state: 'IN',
            zipcode: '44150',
            phone_number: null,
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['address_line_1']).toBe(undefined);
        expect(validationErrors[1]['address_line_2']).toBe(undefined);
        expect(validationErrors[1]['city']).toBe(undefined);
        expect(validationErrors[1]['state']).toBe(undefined);
        expect(validationErrors[1]['zipcode']).toBe(undefined);

    });
    
    it('Test phone number - invalid format - test 1', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: '5025555552',
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['phone_number']).toBe('The value is not in a valid format.');


    });


    it('Test phone number - invalid format - test 2', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: '(502) F55-5555',
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['phone_number']).toBe('The value is not in a valid format.');


    });


    it('Test phone number - invalid format - test 3', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: '(502) 55-5555',
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['phone_number']).toBe('The value is not in a valid format.');


    });

    it('Test phone number - valid format', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: '(502) 555-5555',
            email_address: null
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['phone_number']).toBe(undefined);


    });


    it('Test email address - invalid format - test 1', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'test@ test.com'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['email_address']).toBe('The value is not in a valid format.');


    });

    
    it('Test email address - invalid format - test 2', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'testtest.com'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['email_address']).toBe('The value is not in a valid format.');


    });

 
    it('Test email address - invalid format - test 3', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'test@test .com'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['email_address']).toBe('The value is not in a valid format.');


    });


    it('Test email address - invalid format - test 4', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'test@testcom'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['email_address']).toBe('The value is not in a valid format.');


    });


    it('Test email address - invalid format - test 5', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: '101 Test Ln.',
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'test@test.'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['email_address']).toBe('The value is not in a valid format.');


    });

    it('Test email address - valid format - test 1', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'test@test.cc'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['email_address']).toBe(undefined);


    });


    it('Test email address - valid format - test 2', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'test123@test.com'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['email_address']).toBe(undefined);


    });


    it('Test email address - valid format - test 3', () => {

        let validator = new EmployerValidator();
        let employerRecord = {
            employer_name: 'Test',
            contact_name: null,
            address_line_1: null,
            address_line_2: null,
            city: 'Test',
            state: 'IN',
            zipcode: '47150',
            phone_number: null,
            email_address: 'test.123@test.test.com'
        }
        let validationErrors = validator.validateEmployerRecord(employerRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['email_address']).toBe(undefined);


    });


    it('Test comment - valid data', () => {

        let validator = new EmployerValidator();
        let commentRecord = {
            entity_type: 'E',
            entity_id: 1,
            comment: 'Test'
        }
        let validationErrors = validator.validateChildRecord('comments', commentRecord);

        expect(validationErrors[0]).toBe(false);
        expect(validationErrors[1]['email_address']).toBe(undefined);


    });


    it('Test comment - invalid data', () => {

        let validator = new EmployerValidator();
        let commentRecord = {
            entity_type: 'E',
            entity_id: 1,
            comment: null
        }
        let validationErrors = validator.validateChildRecord('comments', commentRecord);

        expect(validationErrors[0]).toBe(true);
        expect(validationErrors[1]['comment']).toBe('A value is required.');


    });








});