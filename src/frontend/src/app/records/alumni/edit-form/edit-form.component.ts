import { Component, OnInit, Output, Input, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AlumniService } from '../alumni.service';
import { AlumniValidator } from '../alumni.validator';
@Component({
  selector: 'AlumniEditFormComponent',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
@Injectable()
export class AlumniEditFormComponent implements OnInit {
@Output() close:  EventEmitter<any> = new EventEmitter();
@Input() currentAlumnus;
formControls = {
    last_name: new FormControl(''),
    first_name: new FormControl(''),
    mailing_address_line_1: new FormControl(''),
    mailing_address_line_2: new FormControl(''),
    mailing_address_city: new FormControl(''),
    mailing_address_state: new FormControl(''),
    mailing_address_zipcode: new FormControl(''),
    phone_number: new FormControl(''),
    email_address: new FormControl(''),
    alumnus_id: new FormControl('')

}

private detailForms = {
  alumni_degrees: {
    keyField: 'degree_id',
    formGroup: new FormGroup ( 
      { diploma_description: new FormControl(''),
      graduation_term_code: new FormControl(''),
      degree_id: new FormControl(''),
      alumnus_id: new FormControl('')
      }  ),
    validationErrors: {
    }

  },
  currentForm: null,
  currentRecord: null

}


private validationErrors = null;
alumniForm = new FormGroup(this.formControls);
public currentDetailTab = 'alumni_degrees';
public subDetailVisible: boolean = false;
public deleteConfirmationVisible: boolean = false;

  constructor(private service: AlumniService) { }

  ngOnInit() {
    
  }

  loadStudentData(student) {
    this.alumniForm.patchValue(student.alumni);
  }

  deleteRecord() {

  }

  cancelDelete() {
    this.deleteConfirmationVisible = false;
  }


  displaySubDetail(detailType, recordID) {
    this.detailForms.currentForm = detailType;
    if (recordID == null) {
      let newRecord;
        Object.keys(this.detailForms[detailType].formGroup.controls).forEach(a => {
            newRecord[a] = null;
        });
        this.detailForms.currentRecord = newRecord;
        this.detailForms[detailType].formGroup.patchValue(newRecord);
        newRecord['alumnus_id'] = this.currentAlumnus['alumnus_id']; 
    }
    else
    {
      this.service.getChildDetail(detailType,recordID).then(result => { 
        this.detailForms.currentRecord = result['data'];
        this.detailForms[detailType].formGroup.patchValue(result['data'])
      });
    }
    this.subDetailVisible = true;
  }

  processPhone(event) {
    let parsedValue = event.target.value.replace(/\D/g,'').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    
    
    event.target.value = !parsedValue[2] ? parsedValue[1] : '(' + parsedValue[1] + ') ' + parsedValue[2] + (!parsedValue[3] ? '' : '-' + parsedValue[3]); 
    
  }


  changeDetailTab(newTab) {
    this.currentDetailTab = newTab;
  }

  processSaveResponse(response) {

    if (response.validationErrors) {


      this.validationErrors = response.data;


    } else if (response.otherErrors) {



    }
    else {
      
      this.currentAlumnus.alumni = response.data;
      this.alumniForm.patchValue(this.currentAlumnus.alumni);
    }



  }


  submitAlumniGeneralData() {
    
    if (!this.alumniForm.pristine) {
      
      let validator : AlumniValidator = new AlumniValidator();
      this.validationErrors = null;
     let [errorsExist, errors] = validator.validateAlumniRecord(this.alumniForm.value);

     if (errorsExist) {
       this.validationErrors = errors;
     }
     else {
       
     this.service.updateAlumniData('alumni','alumnus_id',this.alumniForm.value).then(result => this.processSaveResponse(result));
     
    }
    
  }
  }

  closeSubDetail() {
    this.subDetailVisible = false;
  }

  submitAlumniChildData() {
    let currentForm = this.detailForms.currentForm;
    if (!this.detailForms[currentForm].formGroup.pristine) {

      let validator : AlumniValidator = new AlumniValidator();
      this.validationErrors = null;
     let [errorsExist, errors] = validator.validateChildRecord(currentForm, this.detailForms[currentForm].formGroup.value);
      if (errorsExist) {
        this.detailForms[this.detailForms.currentForm].validationErrors = errors;
      }
      else
      {
        this.service.updateAlumniData(this.detailForms.currentForm, this.detailForms[currentForm].keyField,this.detailForms[currentForm].formGroup.value).then(result => { 
        let index = this.currentAlumnus[currentForm].map(element => element[this.detailForms[currentForm].keyField]).indexOf(this.detailForms.currentRecord[this.detailForms[currentForm].keyField]);
          console.log(result);
        this.currentAlumnus[currentForm].splice(index, 1, result['data']);

        
        this.subDetailVisible = false;
        });
      }
 


    }




  }



}
