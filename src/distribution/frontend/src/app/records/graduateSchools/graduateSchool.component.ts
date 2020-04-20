import { Component, OnInit } from '@angular/core';
import { GraduateSchoolViewFormComponent} from './view-form/view-form.component';
import { GraduateSchoolEditFormComponent} from './edit-form/edit-form.component';
import { trigger, state, transition, style, animation, animate } from '@angular/animations';
import { GraduateSchoolService } from './graduateSchool.service';

@Component({
  selector: 'app-graduateschools',
  templateUrl: './graduateSchool.component.html',
  styleUrls: ['./graduateSchool.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity:0})),
      transition('void => visible', 
        animate('0.3s')),
      state('visible', style ( { opacity: 1})),
        transition('* => void', animate(500))
    
  ]
)
]
})
export class GraduateSchoolsComponent implements OnInit {

  
  readonly ITEMSPERPAGE = 15;
  public currentPage: number = 1;
  public totalPages: number;
  public detailVisible: boolean = false;
  public viewAllActive: boolean = false;
  public editMode: boolean = false;
  public currentGraduateSchool = {};
  public searchDialogActive = false;
  public searchApplied = false;
  public searchValues = {
    graduate_school_id: null,
    school_name: null,
    city: null,
    state: null

  };
  graduateschoolList;
  constructor(private service: GraduateSchoolService) { }

  ngOnInit() {
    
    this.getSearchResults(true, true);
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
      this.graduateschoolList = res['graduateschoolList'];
      if (newQuery) {
      this.totalPages = res['totalPages'];
      this.searchDialogActive = false;
      }
    }).catch(error => console.log(error));
    
  

  }

  getPageWindowArray() {

    let beginIndex = Math.floor((this.currentPage - 1.0) / 10.0)*10;
    let newArray = [];
    for (let i = beginIndex; i < Math.min(beginIndex + 10, this.totalPages); i++) {
      newArray.push(i);
    }

    return newArray;
  }

  fillGraduateSchoolList() {
    
   this.service.getGraduateSchoolList().then(result => {
     
     this.graduateschoolList = result;
   });

  }


   viewDetail(recordID, editMode) {
     
    this.service.getDetail(recordID).then(
      (result) => {
        
        this.currentGraduateSchool = result;
     
        this.editMode = editMode;
        this.detailVisible = true;
      



      }

    )




  }


  invokeEdit() {
    this.editMode = true;
  }

gotoPage(i) {
 
  this.currentPage = i;
  this.getSearchResults(false);
  return false;
}


addNewGraduateSchool() {
this.currentGraduateSchool = {};
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
