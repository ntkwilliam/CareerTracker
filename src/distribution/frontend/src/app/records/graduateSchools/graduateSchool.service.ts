import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { resolve } from 'url';
import {  HTTP_ROOT, APPLICATION_PORT } from '../../../../../configuration/globals';


@Injectable()
export class GraduateSchoolService {

  constructor(private httpClient: HttpClient) {

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
    searchCriterions['itemsPerPage'] = itemsPerPage.toString();
    searchCriterions['page'] = page;
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/search`,
        {
          params: searchCriterions
        }).toPromise().then(res => {
          results.graduateschoolList = res;
        

          if (page == 1) {
            this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/search/pageCount`,
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

  getGraduateSchoolList() {

    return this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/selectionList`).
      toPromise();
    

  }





  getDetail(recordID) {

    return this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/byid/` + recordID).toPromise();


  }


  
  updateGraduateSchoolData(recordType,data) {
    

    let request = {
      data: data,
      recordType: recordType
    }

    
    return this.httpClient.put(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/`, request).toPromise();
    

  }

  addNewGraduateSchoolData(recordType, data) {



    let request = {
      data: data,
      recordType: recordType
    }


    return this.httpClient.post(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/`, request).toPromise();
    




  }

  deleteGraduateSchoolData(recordType,recordID) {
    

    return this.httpClient.delete(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/`, {params: { record_type: recordType, record_id: recordID}}).toPromise();
    

  }








  getChildDetail(recordType, recordID) {
   
    return this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/data/graduateSchools/childData`,{params: { record_type: recordType, record_id: recordID}}).toPromise();

  }



}

