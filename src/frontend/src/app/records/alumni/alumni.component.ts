import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AlumniService } from './alumni.service';
import { AlumniEditFormComponent } from './edit-form/edit-form.component';
import { AlumniViewFormComponent} from './alumni-view-form/alumni-view-form.component'
@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
  
})
@Injectable()
export class AlumniComponent implements OnInit {

  readonly ITEMSPERPAGE = 10;
  currentPage: number = 1;
  totalPages: number;
  public pages;
  detailVisible: boolean = false;
  viewAllActive: boolean = false;
  editMode: boolean = false;
  public alumniList;
  public currentAlumnus;
  public currentResultsQuery;
  public searchActive = false;
  public searchValues = {
    alumnus_id: null,
    lastName: null,
    firstName: null,
    city: null,
    state: null,
    employer: null,
    graduateSchool: null
  };
  public employerList;
  public graduateSchoolList;
  @ViewChild('editForm', null) editForm;
  @ViewChild('viewForm', null) viewForm;
  private addMode: boolean = false;
  constructor(private service: AlumniService) { }

  ngOnInit() {
    this.getSearchResults(true);
    this.fillEmployerList();
    this.fillGraduateSchoolList();
  }




  getSearchResults(newQuery: boolean) {
    
   
    if (newQuery) {
      this.currentPage = 1;
    }

    this.service.getSearchResults(this.searchValues, this.ITEMSPERPAGE, this.currentPage)
    .then(res => {
      this.alumniList = res['alumniList'];
      if (newQuery) {
      this.pages = res['pages'];
      this.totalPages = res['totalPages'];
      }
    }).catch(error => console.log(error));
    
  

  }

  fillEmployerList() {

   this.service.getEmployerList().then(result => {
     
     this.employerList = result;
   });

  }


  fillGraduateSchoolList() {

    this.service.getGraduateSchoolList().then(result => {
      this.graduateSchoolList = result;
    }).catch(error => console.log('caught'));
 
   }

  displayRetrievalError(error) {

  }

    
    

  

  gotoPage(i) {
    console.log(i);
    this.currentPage = i;
    this.getSearchResults(false);
    return false;
  }


addNewAlumni() {
  this.addMode = true;
  this.editMode = true;
  this.detailVisible = true;
  this.currentAlumnus = {
    
  }
}



    closeDetail() {
      this.detailVisible = false;
      this.editMode = false;
    }

    

}
