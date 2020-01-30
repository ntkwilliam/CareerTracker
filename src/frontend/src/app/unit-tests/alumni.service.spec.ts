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
            alumnus_id: 8,
            lastName: 'Smith',
            firstName: 'Matt',
            city: 'Charlestown',
            state: 'IN',
            employer: 'UPS',
            graduateSchool: null
        }
        ,
        {
            alumnus_id: 9,
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
        for (let property in searchCriterions {
            if (searchCriterions[property] != null) {

                searchResult = searchResult.filter(item => item[property] == searchCriterions[property]);



            }
        }

        return searchResult.slice((page - 1) * itemsPerPage), (page - 1) * itemsPerPage) + itemsPerPage);

    }

    getPageCount(searchCriterions, itemsPerPage) {

        let searchResult = this.searchData;
        for (let property in searchCriterions {
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


describe('alumni general data validation', () => {
    it('Test last_name null', () => {
        let validator = new AlumniSearchTest();
        let searchValues = {
            alumnus_id: null,
            lastName: null,
            firstName: null,
            city: null,
            state: null,
            employer: null,
            graduateSchool: null
        }

    });


});