export class AlumniSearchTest {
    // Fake implementation for testing



    searchData = [

        {
            alumnus_id: 1,
            lastName: 'Smith',
            firstName: 'John',
            city: 'New Albany',
            state: 'IN',
            employer: 'Humana',
            graduateSchool: null
        },
        {
            alumnus_id: 2,
            lastName: 'Smith',
            firstName: 'Jane',
            city: 'New Salisburg',
            state: 'IN',
            employer: 'Ford',
            graduateSchool: null
        },
        {
            alumnus_id: 3,
            lastName: 'Roberts',
            firstName: 'Lisa',
            city: 'New Albany',
            state: 'IN',
            employer: 'UPS',
            graduateSchool: null}
        ,
        {
            alumnus_id: 4,
            lastName: 'Shrout',
            firstName: 'Zeke',
            city: 'Louisville',
            state: 'KY',
            employer: 'Humana',
            graduateSchool: 'University of Louisville'
        }
        ,
        {
            alumnus_id: 5,
            lastName: 'Shrout',
            firstName: 'Tom',
            city: 'Brandenburg',
            state: 'KY',
            employer: null,
            graduateSchool: 'University of Louisville'
        }
        ,
        {
            alumnus_id: 6,
            lastName: 'Pike',
            firstName: 'Adam',
            city: 'Brooks',
            state: 'KY',
            employer: 'UPS',
            graduateSchool: null
        }
        ,
        {
            alumnus_id: 7,
            lastName: 'Morris',
            firstName: 'James',
            city: 'Louisville',
            state: 'KY',
            employer: 'PNC Bank',
            graduateSchool: null
        }
        ,
        {
            alumnus_id: 8,
            lastName: 'Walters',
            firstName: 'Horace',
            city: 'Clarksville',
            state: 'IN',
            employer: 'Kroger',
            graduateSchool: null
        }
        ,
        {
            alumnus_id: 9,
            lastName: 'Smith',
            firstName: 'Matt',
            city: 'Charlestown',
            state: 'IN',
            employer: 'UPS',
            graduateSchool: null
        }
        ,
        {
            alumnus_id: 10,
            lastName: 'Myers',
            firstName: 'Jane',
            city: 'Sellersburg',
            state: 'IN',
            employer: 'Ford',
            graduateSchool: null
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
            alumniList: null,
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
        results.alumniList = this.getDataFromCollection(searchCriterions, page, itemsPerPage);


        if (page == 1) {
            results.totalPages = this.getPageCount(searchCriterions, itemsPerPage);
        }
        return results;
    }


}


describe('alumni service testing - search', () => {
    it('Test all fields null', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(10);
    });



    it('Test alumnus id', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: 3,
            lastName: null,
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(1);
    });

    it('Test last name - exists', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: 'Smith',
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(3);
    });

    it('Test last name - does not exist', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: 'Test',
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(0);
    });

    it('Test first name - exists', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: 'Adam',
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(1);
    });

    it('Test first name - does not exist', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: 'Tori',
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(0);
    });

    it('Test city name - exists', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: 'Clarksville',
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(1);
    });


    it('Test city name - does not exist', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: 'Marengo',
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(0);
    });

    it('Test state - does not exist', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: 'NM',
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(0);
    });

    
    it('Test state - exists', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: 'IN',
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(6);
    });

    it('Test employer - does not exist', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: null,
            employer: 'Bank of America',
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(0);
    });

    
    it('Test employer - exists', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: null,
            employer: 'Humana',
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(2);
    });

    it('Test graduate school - does not exist', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: 'Purdue University'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(0);
    });

    
    it('Test graduate school - exists', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: 'University of Louisville'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(2);
    });



    it('Test combination fields - test 1', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: 'Zeke',
            city: null,
            state: null,
            employer: null,
            graduateSchool: 'University of Louisville'
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(1);
    });


    it('Test combination fields - test 2', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName:  'Smith',
            firstName: 'Zeke',
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(0);
    });


    it('Test combination fields - test 3', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: 3,
            lastName:  null,
            firstName: 'Lisa',
            city: null,
            state: 'IN',
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(1);
    });



    it('Test combination fields - test 4', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName:  null,
            firstName: null,
            city: 'Clarksville',
            state: 'IN',
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 20, 1);
        expect(results.alumniList.length).toBe(1);
    });

    it('Test paging - test 1', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName:  null,
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 5, 1);
        expect(results.totalPages).toBe(2);
    });


    it('Test paging - test 2', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName:  null,
            firstName: null,
            city: null,
            state: 'KY',
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 3, 1);
        expect(results.totalPages).toBe(2);
    });


    it('Test paging - test 3', () => {
        let searchTest = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName:  null,
            firstName: 'Zeke',
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

        let results = searchTest.getSearchResults(searchValues, 3, 1);
        expect(results.totalPages).toBe(1);
    });






});