import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';



@Injectable()
export class AlumniService {

constructor(private httpClient: HttpClient) {

}

getSearchResults(searchValues, itemsPerPage : number, page : number = 1) {
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