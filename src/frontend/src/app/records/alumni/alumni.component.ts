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
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getSearchResults();
  }




  getSearchResults() {
      this.currentPage = 1;

      this.httpClient.get("http://localhost:8080/data/alumni/search", 
      {
        params: {
          itemsPerPage: this.itemsPerPage.toString()
        }
      }).subscribe(data => this.studentsList = data, error => this.displayRetrievalError(error));

      this.httpClient.get("http://localhost:8080/data/alumni/search/pageCount", 
      {
        params: {
          itemsPerPage: this.itemsPerPage.toString()
        }
      }).subscribe(data => {

        this.pages = Array(Math.ceil(data['pageCount'] / this.itemsPerPage));
        this.totalPages = this.pages.length;
    


      }, error => this.displayRetrievalError(error));





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
