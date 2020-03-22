import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AlumniService } from './alumni.service';
import { AlumniEditFormComponent } from './edit-form/edit-form.component';
import { AlumniViewFormComponent} from './view-form/view-form.component'
import { ObjectUnsubscribedError } from 'rxjs';
import { trigger, state, transition, style, animation, animate } from '@angular/animations';
@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity:0})),
      transition('void => visible', 
        animate('0.3s')),
      state('visible', style ( { opacity: 1})),
        transition('* => void', animate(500))
    
  ]
)
]})
@Injectable()
export class AlumniComponent implements OnInit {
  
  readonly ITEMSPERPAGE = 15;
  public currentPage: number = 1;
  public totalPages: number;
  public detailVisible: boolean = false;
  public viewAllActive: boolean = false;
  public editMode: boolean = false;
  public alumniList;
  public currentAlumnus;
  private currentResultsQuery;
  public searchDialogActive = false;
  public searchApplied = false;
  public searchValues = {
    alumnus_id: null,
    last_name: null,
    first_name: null,
    mailing_address_city: null,
    mailing_address_state: null,
    employer: null,
    graduateSchool: null,
    noEmployer: false,
    noGraduateSchool: false,
    graduation_term_code: null

  };
  public employerList;
  public graduateSchoolList;
  @ViewChild('editForm', null) editForm;
  @ViewChild('viewForm', null) viewForm;

  constructor(private service: AlumniService) { }

  ngOnInit() {
    this.getSearchResults(true, true);
    this.fillEmployerList();
    this.fillGraduateSchoolList();
    
  }




  removeSearchFilter() {
    Object.keys(this.searchValues).forEach(a => {
      this.searchValues[a] = null;
    });
    this.getSearchResults(true,true);
  

  }


refreshData() {
    this.getSearchResults(false,false);
  }

  getSearchResults(newQuery: boolean, clearQuery: boolean = false) {
    console.log("running update");
   
    if (newQuery) {
      if (this.searchApplied && clearQuery) {
        this.searchApplied = false;
        
      }
      else if (!this.searchApplied && !clearQuery)
      {
        let criteriaExist = false;
        Object.keys(this.searchValues).forEach(a => {
          if (this.searchValues[a]) {
            criteriaExist = true;
          }
        });

        if (criteriaExist) {
        this.searchApplied = true;
        }
      }
      this.currentPage = 1;
    }

    this.service.getSearchResults(this.searchValues, this.ITEMSPERPAGE, this.currentPage)
    .then(res => {
      this.alumniList = res['alumniList'];
      if (newQuery) {
      this.totalPages = res['totalPages'];
      this.searchDialogActive = false;
      }
    }).catch(error => console.log(error));
    
  

  }

  getPageWindowArray() {

    let beginIndex = Math.floor((this.currentPage - 1.0) / 10.0);
    let newArray = [];
    for (let i = beginIndex; i < Math.min(beginIndex + 10, this.totalPages); i++) {
      newArray.push(i);
    }
    console.log(newArray);
    return newArray;
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

    
    viewDetail(recordID, editMode) {
      
      this.service.getDetail(recordID).then(
        (result) => {
          this.currentAlumnus = result;
          this.editMode = editMode;
          this.detailVisible = true;
          console.log(this.editMode);



        }

      )




    }

  
    invokeEdit() {
      this.editMode = true;
    }

  gotoPage(i) {
    console.log(i);
    this.currentPage = i;
    this.getSearchResults(false);
    return false;
  }


addNewAlumni() {
  this.currentAlumnus = {};
  this.editMode = true;
  this.detailVisible = true;
  
}



    closeDetail() {
      
      this.detailVisible = false;
      this.editMode = false;
      
    }


    toggleSearchActive() {
     
      this.searchDialogActive = !this.searchDialogActive;
   
    }

}
