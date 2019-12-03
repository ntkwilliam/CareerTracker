import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
@Injectable()
export class AlumniComponent implements OnInit {

  readonly itemsPerPage = 20;
  currentPage : number = 1;
  totalPages: number;
  public pages;
  detailVisible : boolean = false;
  public studentsList;
  public currentStudent: { 
    student_id: 0;
  };
  public currentResultsQuery;
  public searchValues = {
    student_id: null,
    lastName: null,
    firstName: null,
    city: null,
    state: null,
    employer: null,
    graduateSchool: null
  };
  public employerList;
  public graduateSchoolList;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getSearchResults();
    this.fillEmployerList();
    this.fillGraduateSchoolList();
  }




  getSearchResults() {
      this.currentPage = 1;
      let searchCriterions = {};
      Object.keys(this.searchValues).forEach(a => 
       {
          if (this.searchValues[a] != null && this.searchValues[a] != '')
          {
             searchCriterions[a] = this.searchValues[a];
          }
        }
          );
      searchCriterions['itemsPerPage'] = this.itemsPerPage.toString();
        console.log(searchCriterions);

      this.httpClient.get("http://localhost:8080/data/alumni/search", 
      {
        params: searchCriterions
      }).subscribe(data => { this.studentsList = data; console.log(this.studentsList); }, error => this.displayRetrievalError(error));

      this.httpClient.get("http://localhost:8080/data/alumni/search/pageCount", 
      {
        params: searchCriterions
      }).subscribe(data => {

        this.pages = Array(Math.ceil(data['pageCount'] / this.itemsPerPage));
        this.totalPages = this.pages.length;
        


      }, error => this.displayRetrievalError(error));
      
   }

   fillEmployerList() {

      this.httpClient.get("http://localhost:8080/data/employers/selectionList").subscribe(data => 
      this.employerList = data, error =>  this.displayRetrievalError(error));
      
   }

   fillGraduateSchoolList() {

    this.httpClient.get("http://localhost:8080/data/graduate-schools/selectionList").subscribe(data => 
    this.graduateSchoolList = data, error =>  this.displayRetrievalError(error));
    
 }

   displayRetrievalError(error)  {

   }

   viewDetail(recordID : number) {
    // Implement view detail form display functionality


   }

   editRecord(recordID : number) {
     // Implement record editing form display functionality
   }

   validateRecord() {
     // Implement record editing validation functionality
   }

   saveRecord() {
     //Implement record update/save functionality
   }   

}
