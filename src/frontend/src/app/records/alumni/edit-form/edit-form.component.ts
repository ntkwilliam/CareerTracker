import { Component, OnInit, Output, Input, Injectable, ComponentFactoryResolver } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AlumniService } from '../alumni.service';
import { AlumniValidator } from '../alumni.validator';
import { $ } from 'protractor';
@Component({
  selector: 'AlumniEditFormComponent',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
@Injectable()
export class AlumniEditFormComponent implements OnInit {
@Output() close:  EventEmitter<any> = new EventEmitter();
@Input() currentAlumnus;
@Input() employerList;
@Input() graduateSchoolList;
@Input() addMode;
private formControls = {
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
      }  )
    },
    alumni_employments: {
      keyField: 'employment_id',
      formGroup: new FormGroup ( 
        { employer_id: new FormControl(''),
        job_title: new FormControl(''),
        employment_id: new FormControl(''),
        alumnus_id: new FormControl(''),
        active: new FormControl('')

        }  )
      },
  alumni_graduate_schools: {
    keyField: ['alumni_graduate_school_id'],
    formGroup: new FormGroup ( 
      { alumni_graduate_school_id: new FormControl(''),
       graduate_school_id: new FormControl(''),
      alumnus_id: new FormControl('')
      }
    )

  },
  comments: {
    keyField: ['comment_id'],
    formGroup: new FormGroup ( 
      { comment_id: new FormControl(''),
       comment: new FormControl(''),
      entity_id: new FormControl(''),
      entity_type: new FormControl('')

      }
    )

  },
  validationErrors: null,
  currentForm: null,
  currentRecordID: null,
  currentRecord: null,
  detailVisible: false,
  recordStatus: null

}
private recordStatus: string = null;
private deleteRequest;
private validationErrors = null;
private alumniForm = new FormGroup(this.formControls);
private currentDetailTab = 'alumni_degrees';
private deleteConfirmationVisible: boolean = false;


  constructor(private service: AlumniService) { }

  ngOnInit() {
    if (!this.addMode) {
    this.loadStudentData();
    }
  }

  loadStudentData() {
    this.alumniForm.patchValue(this.currentAlumnus.alumni);
    
  }

  deleteRecord(recordType, recordID) {
    this.deleteRequest = {
      recordType: recordType,
      recordID: recordID
    };
    this.deleteConfirmationVisible = true;
  }


  finalizeDelete() {
    this.deleteConfirmationVisible = false;
    if (this.deleteRequest) {
    
      this.service.deleteAlumniData(this.deleteRequest['recordType'], this.deleteRequest['recordID']).then(
        a =>  {
          
          if (this.deleteRequest['recordType']=='alumni') {
            this.close.emit();
          }
          else
          {
            let index = this.currentAlumnus[this.deleteRequest['recordType']].map(element => element[this.detailForms[this.deleteRequest['recordType']].keyField]).indexOf(this.deleteRequest['record_id']);
            this.currentAlumnus[this.deleteRequest['recordType']].splice(index, 1);
            
          }
        }, b => console.log(b));
      
    }
  }

  cancelDelete() {
    this.deleteConfirmationVisible = false;
  }

  showRecordStatus(status) {
    if (!this.detailForms.detailVisible) {
      this.recordStatus = status;
      setTimeout(function() {
        this.recordStatus = null;
      }.bind(this), 3000);
    }
    else
    {
      this.detailForms.recordStatus = status;
      setTimeout(function() {
        this.detailForms.recordStatus = null;
      }.bind(this), 3000);
    }

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
        
        this.detailForms[detailType].formGroup.patchValue(result['data']);
        
        
      });
    }
    this.detailForms.detailVisible = true;
  }

  






  processPhone(event) {
    let parsedValue = event.target.value.replace(/\D/g,'').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    
    
    event.target.value = !parsedValue[2] ? parsedValue[1] : '(' + parsedValue[1] + ') ' + parsedValue[2] + (!parsedValue[3] ? '' : '-' + parsedValue[3]); 
    
  }


  changeDetailTab(newTab) {
    this.currentDetailTab = newTab;
  }

  processSaveResponse(recordType, response) {
    
    if (response.noChange) {
      this.showRecordStatus('No changes have been made.');
      return;
    }


    if (recordType == 'alumni') {
      
    if (response.validationError) {


      this.validationErrors = response.data;


    } else if (response.otherError) {



    } else if (this.addMode) {
      this.currentAlumnus = {};
    
      this.currentAlumnus.alumni = response[0];
      this.alumniForm.patchValue(this.currentAlumnus.alumni);
      
      this.addMode = false;
      
    }
    else {
      
      this.currentAlumnus.alumni = response.data;
      this.alumniForm.patchValue(this.currentAlumnus.alumni);
      this.showRecordStatus('The record has been saved successfully.');
      this.alumniForm.markAsPristine();
      }

  }
  else 
  {
     if (response.validationError) {
        this.detailForms.validationErrors = response['data'];
        
     }
     else if (response.otherError) {

     }
     else 
     {
       
       let keyField = this.detailForms[recordType].keyField;
      let index = this.currentAlumnus[recordType].map(element => element[keyField]).indexOf(this.detailForms.currentRecord[keyField]);
      this.currentAlumnus[recordType].splice(index, 1, response['data']);
      this.showRecordStatus('The record has been saved successfully.');
      this.detailForms[recordType].formGroup.markAsPristine();
      
      
     }
    }
      
  

  }


  submitAlumniGeneralData() {
    
    this.recordStatus = null;
    if (!this.alumniForm.pristine) {
      
      this.recordStatus = null;
      let validator : AlumniValidator = new AlumniValidator();
      this.validationErrors = null;
     let [errorsExist, errors] = validator.validateAlumniRecord(this.alumniForm.value);

     if (errorsExist) {
       this.validationErrors = errors;
     }
     else {
    
     this.service.updateAlumniData('alumni',this.alumniForm.value).then(result => this.processSaveResponse('alumni',result));
     
    }
    
  }
  else
  {
   this.showRecordStatus('No changes have been made.');
  }
  }

  closeSubDetail() {
    this.detailForms.detailVisible = false;
  }

  submitAlumniChildData() {
    let currentForm = this.detailForms.currentForm;
    if (!this.detailForms[currentForm].formGroup.pristine) {
      this.detailForms.recordStatus = null;
      let validator : AlumniValidator = new AlumniValidator();
      this.validationErrors = null;
     let [errorsExist, errors] = validator.validateChildRecord(currentForm, this.detailForms[currentForm].formGroup.value);
      if (errorsExist) {
        this.detailForms.validationErrors = errors;
      }
      else
      {
        this.service.updateAlumniData(this.detailForms.currentForm,this.detailForms[currentForm].formGroup.value).then(result => this.processSaveResponse(currentForm,result)
        );
      }
 


    }
    else
    {
      this.showRecordStatus('No changes have been made.');

    }



  }



}
