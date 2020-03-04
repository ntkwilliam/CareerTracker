import { NullTemplateVisitor } from '@angular/compiler';

export class EmployerSearchTest {
    // Fake implementation for testing



    searchData = [

        {
            employer_id: 1,
            employer_name: 'Target',
            city: 'New Albany',
            state: 'IN',
            
        },
        {
            employer_id: 2,
            employer_name: 'Ford',
            city: 'Louisville',
            state: 'KY',
        },
        {
            
            employer_id: 3,
            employer_name: 'UPS',
            city: 'Louisville',
            state: 'KY',
        }
        ,
        {
           
            employer_id: 4,
            employer_name: 'PNC Bank',
            city: 'Louisville',
            state: 'KY',
        }
        ,
        {
            
            employer_id: 5,
            employer_name: 'Jewish Hospital',
            city: 'Louisville',
            state: 'KY',
        }
        ,
        {
            employer_id: 6,
            employer_name: 'Norton Healthcare',
            city: 'Louisville',
            state: 'KY',
        }
        ,
        {
            employer_id: 7,
            employer_name: 'Samtec',
            city: 'New Albany',
            state: 'IN',
        }
        ,
        {
          
            employer_id: 8,
            employer_name: 'Fedex',
            city: 'Louisville',
            state: 'KY',
        }
        ,
        {
            
            employer_id: 9,
            employer_name: 'Smith Consulting',
            city: 'Clarksville',
            state: 'IN',
        }
        ,
        {
            
            employer_id: 10,
            employer_name: 'Caesars Indiana',
            city: 'Elizabeth',
            state: 'IN',
        }




    ];



    getDataFromCollection(searchCriterions, page, itemsPerPage) {
        let searchResult = this.searchData;
        for (let property in searchCriterions) {
            if (searchCriterions[property] != null) {

                searchResult = searchResult.filter(item => item[property] == searchCriterions[property]);



            }
        }

        return searchResult.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);

    }

    getPageCount(searchCriterions, itemsPerPage) {

        let searchResult = this.searchData;
        for (let property in searchCriterions) {
            if (searchCriterions[property] != null) {

                searchResult = searchResult.filter(item => item[property] == searchCriterions[property]);



            }
        }

        return Math.ceil(searchResult.length / itemsPerPage);


    }





    getSearchResults(searchValues, itemsPerPage: number, page: number = 1) {
        let results = {
            employerList: null,
            errorResult: null,
            pages: null,
            totalPages: null
        };
        let searchCriterions = {};
        Object.keys(searchValues).forEach(a => {
            if (searchValues[a] != null && searchValues[a] != '') {
                searchCriterions[a] = searchValues[a];
            }
        }
        );
        results.employerList = this.getDataFromCollection(searchCriterions, page, itemsPerPage);


        if (page == 1) {
            results.totalPages = this.getPageCount(searchCriterions, itemsPerPage);
        }
        return results;
    }


}


describe('employer service testing - search', () => {
    it('Test all fields null', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
         
            employer_id: null,
            employer_name: null,
            city: null,
            state: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(10);
    });



    it('Test employer id', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            employer_id: 5,
            employer_name: null,
            city: null,
            state: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(1);
    });


    it('Test city  - exists', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            employer_id: null,
            city: 'Louisville',
            state: null,
            employer_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(6);
    });

    it('Test city - does not exist', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            
            employer_id: null,
            city: 'Test',
            state: null,
            employer_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(0);
    });

    it('Test employer name  - exists', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            employer_id: null,
            city: null,
            state: null,
            employer_name: 'UPS',
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(1);
    });

    it('Test employer name - does not exist', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            
            employer_id: null,
            city: null,
            state: null,
            employer: 'Burger King'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(0);
    });
    it('Test state  - exists', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            employer_id: null,
            city: null,
            state: 'KY',
            employer_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(6);
    });

    it('Test state - does not exist', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            
            employer_id: null,
            city: null,
            state: 'PA',
            employer_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(0);
    });


  

    it('Test combination fields - test 1', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
           
            employer_id: 2,
            city: null,
            state: 'KY',
            employer_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(1);
    });


    it('Test combination fields - test 2', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            
            employer_id: null,
            city: 'Louisville',
            state: 'KY',
            employer_name: 'Humana'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(0);
    });


    it('Test combination fields - test 3', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            employer_id: null,
            city: null,
            state: 'KY',
            employer_name: 'Ford'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.employerList.length).toBe(1);
    });


    it('Test paging - test 1', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            
            employer_id: null,
            city: null,
            state: 'KY',
            employer_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 5, 1);
        expect(results.totalPages).toBe(2);
    });


    it('Test paging - test 2', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            
            employer_id: null,
            city: null,
            state: null,
            employer_name: 'Fedex'
        }

        let results = searchTest.getSearchResults(searchValues, 3, 1);
        expect(results.totalPages).toBe(1);
    });


    it('Test paging - test 3', () => {
        let searchTest = new EmployerSearchTest();
        let searchValues = {
            
            employer_id: null,
            city: null,
            state: 'KY',
            employer_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 6, 1);
        expect(results.totalPages).toBe(1);
    });






});