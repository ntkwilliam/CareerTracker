import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';



@Injectable()
export class AlumniService {

  constructor(private httpClient: HttpClient) {

  }

  getSearchResults(searchValues, itemsPerPage: number, page: number = 1) {
    let results = {
      studentsList: null,
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
    searchCriterions['itemsPerPage'] = itemsPerPage.toString();
    searchCriterions['page'] = page;
    return new Promise((resolve, reject) => {
      this.httpClient.get("http://localhost:8080/data/alumni/search",
        {
          params: searchCriterions
        }).toPromise().then(res => {
          results.studentsList = res;


          if (page == 1) {
            this.httpClient.get("http://localhost:8080/data/alumni/search/pageCount",
              {
                params: searchCriterions
              }).toPromise().then(res => {

                results.totalPages = res['pageCount'];
                results.pages = Array(results.totalPages);
                resolve(results)
              }).catch(error => reject(error));
          }
          else {
            resolve(results);
          }

        }).catch(error => reject(error));
    });
  }

  getEmployerList() {

    return this.httpClient.get("http://localhost:8080/data/employers/selectionList").
      toPromise();


  }




  getGraduateSchoolList() {

    return this.httpClient.get("http://localhost:8080/data/graduate-schools/selectionList").
      toPromise();

  }

  getDetail(recordID) {

    return this.httpClient.get("http://localhost:8080/data/alumni/byid/" + recordID).toPromise();


  }





}

export class AlumniValidator {

  private validationErrors = {
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

  private errorsExist = false;

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
    if (this.validateField('mailing_address_line_1', values['mailing_address_line_1'], false, null)[0]
    || this.validateField('mailing_address_line_2', values['mailing_address_line_2'], false, null)[0]) 
    {
      this.validateField('mailing_address_city', values['mailing_address_city'], true, /^[A-Za-z-' ]{1,25}$/);
      this.validateField('mailing_address_state', values['mailing_address_state'], true, /^[A-Z]{2}$/);
      this.validateField('mailing_address_zipcode', values['mailing_address_zipcode'], true, /^[0-9]{5}$/);
    }   
    else 
    {
      this.validateField('mailing_address_city', values['mailing_address_city'], false, /^[A-Za-z-' ]{1,25}$/);
      this.validateField('mailing_address_state', values['mailing_address_state'], false, /^[A-Z]{2}$/);
      this.validateField('mailing_address_zipcode', values['mailing_address_zipcode'], false, /^[0-9]{5}$/);
    }

    this.validateField('phone_number', values['phone_number'], false, /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/);
    this.validateField('email_address', values['email_address'], false, /^[a-zA-Z-0-9._]+@[a-zA-Z-0-9._]+.[a-zA-Z]+/)



    return [this.errorsExist, this.validationErrors];

  }







  }
