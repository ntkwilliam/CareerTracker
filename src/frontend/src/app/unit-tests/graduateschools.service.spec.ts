import { NullTemplateVisitor } from '@angular/compiler';

export class GraduateschoolSearchTest {
    // Fake implementation for testing



    searchData = [

        {
            graduate_school_id: 1,
            school_name: 'IUS',
            city: 'New Albany',
            state: 'IN',
            
        },
        {
            graduate_school_id: 2,
            school_name: 'University of Louisville',
            city: 'Louisville',
            state: 'KY',
        },
        {
            
            graduate_school_id: 3,
            school_name: 'Sullivan University',
            city: 'Louisville',
            state: 'KY',
        }
        ,
        {
           
            graduate_school_id: 4,
            school_name: 'Spalding University',
            city: 'Louisville',
            state: 'KY',
        }
        ,
        {
            
            graduate_school_id: 5,
            school_name: 'UCLA',
            city: 'Los Angeles',
            state: 'CA',
        }
        ,
        {
            graduate_school_id: 6,
            school_name: 'Purdue University',
            city: 'West Lafayette',
            state: 'IN',
        }
        ,
        {
            graduate_school_id: 7,
            school_name: 'University of Kentucky',
            city: 'Lexington',
            state: 'KY',
        }
        ,
        {
          
            graduate_school_id: 8,
            school_name: 'University of Cincinnati',
            city: 'Cincinnati',
            state: 'OH',
        }
        ,
        {
            
            graduate_school_id: 9,
            school_name: 'Wright State University',
            city: 'Dayton',
            state: 'OH',
        }
        ,
        {
            
            graduate_school_id: 10,
            school_name: 'Indiana State University',
            city: 'Indianapolis',
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
            graduateschoolList: null,
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
        results.graduateschoolList = this.getDataFromCollection(searchCriterions, page, itemsPerPage);


        if (page == 1) {
            results.totalPages = this.getPageCount(searchCriterions, itemsPerPage);
        }
        return results;
    }


}


describe('graduate eschool service testing - search', () => {
    it('Test all fields null', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
         
            graduate_school_id: null,
            school_name: null,
            city: null,
            state: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(10);
    });



    it('Test graduateschool id', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            graduate_school_id: 5,
            school_name: null,
            city: null,
            state: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(1);
    });


    it('Test city  - exists', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            graduate_school_id: null,
            city: 'Louisville',
            state: null,
            school_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(3);
    });

    it('Test city - does not exist', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            
            graduate_school_id: null,
            city: 'Test',
            state: null,
            school_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(0);
    });

    it('Test graduateschool name  - exists', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            graduate_school_id: null,
            city: null,
            state: null,
            school_name: 'University of Louisville',
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(1);
    });

    it('Test graduateschool name - does not exist', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            
            graduate_school_id: null,
            city: null,
            state: null,
            graduateschool: 'Test'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(0);
    });
    it('Test state  - exists', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            graduate_school_id: null,
            city: null,
            state: 'KY',
            school_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(4);
    });

    it('Test state - does not exist', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            
            graduate_school_id: null,
            city: null,
            state: 'PA',
            school_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(0);
    });


  

    it('Test combination fields - test 1', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
           
            graduate_school_id: 2,
            city: null,
            state: 'KY',
            school_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(1);
    });


    it('Test combination fields - test 2', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            
            graduate_school_id: null,
            city: 'Louisville',
            state: 'KY',
            school_name: 'Humana'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(0);
    });


    it('Test combination fields - test 3', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            graduate_school_id: null,
            city: null,
            state: 'KY',
            school_name: 'University of Kentucky'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.graduateschoolList.length).toBe(1);
    });


    it('Test paging - test 1', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            
            graduate_school_id: null,
            city: null,
            state: 'KY',
            school_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 5, 1);
        expect(results.totalPages).toBe(1);
    });


    it('Test paging - test 2', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            
            graduate_school_id: null,
            city: null,
            state: null,
            school_name: 'Purdue University'
        }

        let results = searchTest.getSearchResults(searchValues, 3, 1);
        expect(results.totalPages).toBe(1);
    });


    it('Test paging - test 3', () => {
        let searchTest = new GraduateschoolSearchTest();
        let searchValues = {
            
            graduate_school_id: null,
            city: null,
            state: 'KY',
            school_name: null
        }

        let results = searchTest.getSearchResults(searchValues, 6, 1);
        expect(results.totalPages).toBe(1);
    });






});