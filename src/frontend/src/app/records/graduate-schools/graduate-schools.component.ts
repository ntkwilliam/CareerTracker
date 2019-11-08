import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graduate-schools',
  templateUrl: './graduate-schools.component.html',
  styleUrls: ['./graduate-schools.component.css']
})
export class GraduateSchoolsComponent implements OnInit {

  
  readonly ITEMS_PER_PAGE = 20;
  current_page : number = 1;
  total_pages: number;
  detail_visible : boolean = false;

  constructor() { }

  ngOnInit() {
  }



   getSearchResults() {
    //Implement search/list population functionality
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
