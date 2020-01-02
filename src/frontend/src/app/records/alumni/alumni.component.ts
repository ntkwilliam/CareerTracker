import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AlumniService } from './alumni.service';
import { AlumniEditFormComponent } from './edit-form/edit-form.component';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
  
})
@Injectable()
export class AlumniComponent implements OnInit {

  readonly ITEMSPERPAGE = 20;
  currentPage: number = 1;
  totalPages: number;
  public pages;
  detailVisible: boolean = false;
  editMode: boolean = false;
  public currentDetailTab;
  public studentsList;
  public currentStudent;
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
  @ViewChild('editForm', null) editForm;
  constructor(private service: AlumniService) { }

  ngOnInit() {
    this.getSearchResults();
    this.fillEmployerList();
    this.fillGraduateSchoolList();
  }




  getSearchResults() {
    
   
    this.service.getSearchResults(this.searchValues, this.ITEMSPERPAGE)
    .then(res => {
      this.studentsList = res['studentsList'];
      this.pages = res['pages'];
      this.totalPages = res['totalPages'];
      
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

  viewDetail(recordID: number, editMode: boolean) {
    this.currentDetailTab = "degrees";
    this.service.getDetail(recordID).then(data => {
      this.currentStudent = data;
      this.editMode = editMode;
      this.editForm.loadStudentData(this.currentStudent);
      this.detailVisible = true;
      
    });
    
    

  }
  

    closeDetail() {
      this.detailVisible = false;
      this.editMode = false;
    }

    changeDetailTab(newTab) {
      this.currentDetailTab = newTab;
    }

  editRecord(recordID: number) {
    // Implement record editing form display functionality
  }

  validateRecord() {
    // Implement record editing validation functionality
  }

  saveRecord() {
    //Implement record update/save functionality
  }

}
