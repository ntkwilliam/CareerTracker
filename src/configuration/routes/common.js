


const sendErrorResponse = function(res,errorCode, errorMessage) {
    res.status(errorCode).send('The request could not be processed.  Reason: ' + errorMessage);
};

getQueryValues = (queryValues, entityName) => {
    
    let criteria = '';
    let propValues = [];
    for (let propName in queryValues) {
        
        let specialQuery = specialQueryStrings[entityName][propName];
        if (queryValues.hasOwnProperty(propName) && propName != 'page' && propName != 'itemsPerPage') {
          if  (specialQuery == undefined || specialQuery.includeParameter) {
            if (propName.endsWith('_id')) {

                let intID = parseInt(queryValues[propName]);
                if (intID == NaN) {
                    propValues.push(queryValues[propName]);

                }
                else {
                    propValues.push(intID);
                }
            }
            else {
                propValues.push(queryValues[propName]);

            }
        }
            if (specialQueryStrings[entityName][propName] == undefined) {
                if (queryValues[propName].search(/\%/g) == -1) {
                criteria += ' AND ' + propName + ' = ?';
                }
                else 
                {
                criteria += ' AND ' + propName + ' LIKE ?';
                }
            }
            else {
                criteria += ' AND ' + specialQueryStrings[entityName][propName].queryString;
            }
        }
    }

    return [criteria, propValues];

};

const specialQueryStrings = {

    alumni: {
        employer: {
            includeParameter: boolean = true,
          queryString: string =  'alumni.alumnus_id IN (SELECT alumnus_id from alumni_employments WHERE employer_id = ? AND active = 1 and deleted = 0)'
        },
        graduateSchool:
    {
            includeParameter:boolean = true,
         queryString: string = 'alumni.alumnus_id IN (SELECT alumnus_id from alumni_graduate_schools WHERE graduate_school_id = ? and deleted = 0)',
        },
        noEmployer: {
            includeParameter: boolean = false,
            queryString: string = 'alumni_employments.employer_id IS NULL'
        },
        noGraduateSchool: {
            includeParameter: boolean = false,
            queryString: string = 'alumni_graduate_schools.graduate_school_id IS NULL'
        }       
        
    },
    employers: {

    },
    graduate_schools: {

    }

}

const tableData = {
    alumni: {
        keyField: string = 'alumnus_id',
        recordQueryString: string = 'SELECT * FROM alumni WHERE alumnus_id = ?'
        
    },
    alumni_degrees: {
        keyField: string = 'degree_id',
        recordQueryString: string = 'SELECT alumnus_id, degree_id, diploma_description, graduation_term_code, added_by, added_datetime, updated_by, updated_datetime' +
        ' FROM alumni_degrees WHERE degree_id = ?'
      
    },
    alumni_employments: {
        keyField: string = 'employment_id',
        recordQueryString: string = 'SELECT alumnus_id, employment_id, employers.employer_id, employer_name, city, state, job_title, active,  alumni_employments.added_by, alumni_employments.added_datetime,' +
        ' alumni_employments.updated_by, alumni_employments.updated_datetime FROM alumni_employments INNER JOIN employers ON alumni_employments.employer_id' +
        ' = employers.employer_id WHERE employment_id = ?'
    },
    alumni_graduate_schools: {
        keyField: string = 'alumni_graduate_school_id',
        recordQueryString: string = 'SELECT alumnus_id, alumni_graduate_school_id, graduate_schools.graduate_school_id, school_name, city, state, alumni_graduate_schools.added_by, alumni_graduate_schools.added_datetime,' +
        ' alumni_graduate_schools.updated_by, alumni_graduate_schools.updated_datetime FROM alumni_graduate_schools INNER JOIN graduate_schools ON graduate_schools.graduate_school_id' +
        ' = alumni_graduate_schools.graduate_school_id WHERE alumni_graduate_school_id = ?'
    
    },
    comments: {
        keyField: string = 'comment_id',
        recordQueryString: string = 'SELECT entity_type, entity_id, comment_id, comment, added_by, added_datetime, updated_by, updated_datetime FROM comments WHERE comment_id = ?' 
    },

    employers: {
        keyField: string = 'employer_id',
        recordQueryString: string = 'SELECT * FROM employers WHERE employer_id = ?'
    },
    graduate_schools: {
        keyField: string = 'graduate_school_id',
        recordQueryString: string = 'SELECT * from graduate_schools WHERE graduate_school_id = ?'
    }

}



detectChanges = function(existingRecord, updatedRecord)  {

    changesFound = false;

    changedFieldValues = {};
    queryString = '';
    for (let prop in updatedRecord) {
        if (Object.prototype.hasOwnProperty.call(updatedRecord, prop)) {
            if (!existingRecord && updatedRecord[prop] != '' || existingRecord &&  existingRecord[prop] != updatedRecord[prop]) {
                changesFound = true;
                changedFieldValues[prop] = updatedRecord[prop];
            }

        }

    }
   

   return [changesFound, changedFieldValues]





}



const DEFAULT_PAGE_SIZE = 15;
const database = require('./database');

module.exports = {
    getQueryValues, specialQueryStrings, detectChanges, tableData, sendErrorResponse,  DEFAULT_PAGE_SIZE, database
}