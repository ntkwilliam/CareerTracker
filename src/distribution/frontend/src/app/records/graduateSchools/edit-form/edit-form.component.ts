import { Component, OnInit, Output, Input, Injectable, ComponentFactoryResolver , Renderer2} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { GraduateSchoolService } from '../graduateSchool.service';
const GraduateSchoolValidator = require('../../../../../../validations/graduateSchools')

import { $ } from 'protractor';
@Component({
  selector: 'GraduateSchoolEditFormComponent',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
@Injectable()
export class GraduateSchoolEditFormComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  @Input() currentGraduateSchool;
  @Input() addMode;
  public formControls = {
    school_name: new FormControl(''),
    contact_name: new FormControl(''),
    address_line_1: new FormControl(''),
    address_line_2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipcode: new FormControl(''),
    phone_number: new FormControl(''),
    email_address: new FormControl(''),
    graduate_school_id: new FormControl('')

  }


public detailForms = {

comments: {
    formGroup: new FormGroup ({
      comment_id: new FormControl(''),
    comment: new FormControl(''),
    entity_id: new FormControl(''),
    entity_type: new FormControl('')
    })
   
},
currentRecord: {},
validationErrors: null,
addMode: false,
detailVisible: false,
recordStatus: null,
currentForm: null

}


 

  
  public recordStatus: string = null;
  public deleteRequest;
  public validationErrors = null;
  public graduateschoolForm = new FormGroup(this.formControls);
  public deleteConfirmationVisible: boolean = false;
  public currentDetailTab = 'comments';
  constructor(private service: GraduateSchoolService, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
    
    if (this.currentGraduateSchool.graduateSchool != undefined) {
      this.loadGraduateSchoolData();
    }
    else
    {
      this.addMode = true;
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
   
  }

  closeWindow() {
    this.refreshData.emit();
    this.close.emit();
  }

  loadGraduateSchoolData() {
   
    this.graduateschoolForm.patchValue(this.currentGraduateSchool.graduateSchool);

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
     
      this.service.deleteGraduateSchoolData(this.deleteRequest['recordType'], this.deleteRequest['recordID']).then(
        a => {

          if (this.deleteRequest['recordType'] == 'graduate_school') {
            this.refreshData.emit();
            this.close.emit();
          }
          else {
            let index = this.currentGraduateSchool[this.deleteRequest['recordType']].map(element => element[this.detailForms[this.deleteRequest['recordType']].keyField]).indexOf(this.deleteRequest['recordID']);
            this.currentGraduateSchool[this.deleteRequest['recordType']].splice(index, 1);
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
      setTimeout(function () {
        this.recordStatus = null;
      }.bind(this), 3000);
    }
    else {
      this.detailForms.recordStatus = status;
      setTimeout(function () {
        this.detailForms.recordStatus = null;
      }.bind(this), 3000);
    }

  }

  addnewDetailRecord() {
    this.detailForms.addMode = true;
   this.displaySubDetail('comments', null);
  }


  displaySubDetail(detailType, recordID) {

   
    if (recordID == null) {

      let newRecord = {};
      Object.keys(this.detailForms[detailType].formGroup.controls).forEach(a => {
        newRecord[a] = null;
      });

      newRecord['entity_id'] = this.currentGraduateSchool.graduateSchool['graduate_school_id'];
      newRecord['entity_type'] = 'G';
      this.detailForms.currentRecord = newRecord;

      this.detailForms[detailType].formGroup.patchValue(newRecord);
  
    }
    else {

      this.service.getChildDetail(detailType, recordID).then(result => {
 
        this.detailForms.currentRecord = result['data'];

        this.detailForms[detailType].formGroup.patchValue(result['data']);


      });
    }
    this.detailForms.currentForm = detailType;
    this.detailForms.detailVisible = true;
  }


 processZipCode(event) {
    let parsedValue = event.target.value.replace(/\D/g, '').match(/(\d{0,5})-?(\d{0,4})/);


    this.formControls.zipcode.patchValue(!parsedValue[2] ? parsedValue[1] : parsedValue[1] + '-' + parsedValue[2]);

  }





  processPhone(event) {
    let parsedValue = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);


    event.target.value = !parsedValue[2] ? parsedValue[1] : '(' + parsedValue[1] + ') ' + parsedValue[2] + (!parsedValue[3] ? '' : '-' + parsedValue[3]);

  }



  processSaveResponse(recordType, response) {
    
    if (response.noChange) {
      this.showRecordStatus('No changes have been made.');
      return;
    }


    if (recordType == 'graduate_schools') {
     
      if (response.validationError) {


        this.validationErrors = response.data;


      } else if (response.otherError) {



      } else if (this.addMode) {
        this.currentGraduateSchool = {};
        
        this.currentGraduateSchool.graduateSchool = response.data[0];
       
        this.graduateschoolForm.patchValue(this.currentGraduateSchool.graduateSchool);
        this.showRecordStatus('The record has been saved successfully.');
        this.graduateschoolForm.markAsPristine();
        this.addMode = false;

      }
      else {
    
        this.currentGraduateSchool.graduateSchool = response.data;
        this.graduateschoolForm.patchValue(this.currentGraduateSchool.graduateSchool);
        this.showRecordStatus('The record has been saved successfully.');
        this.graduateschoolForm.markAsPristine();
      }

    }
    else {
      if (response.validationError) {
        this.detailForms.validationErrors = response['data'];

      }
      else if (response.otherError) {

      }
      else if (this.detailForms.addMode) {
        if (this.currentGraduateSchool[recordType] == undefined) {
          this.currentGraduateSchool[recordType] = [];
        }
      
        this.currentGraduateSchool[recordType].unshift(response['data'][0]);
        
        this.detailForms[recordType].formGroup.patchValue(response['data'][0]);
        this.detailForms.addMode = false;   
        
        this.showRecordStatus('The record has been saved successfully.');
      }
      else {

        let keyField = this.detailForms[recordType].keyField;
        let index = this.currentGraduateSchool[recordType].map(element => element[keyField]).indexOf(this.detailForms.currentRecord[keyField]);
        this.currentGraduateSchool[recordType].splice(index, 1, response['data']);
        this.showRecordStatus('The record has been saved successfully.');
        this.detailForms[recordType].formGroup.patchValue(response['data']);

        this.detailForms[recordType].formGroup.markAsPristine();
        this.detailForms.addMode = false;


      }
    }



  }


  submitGraduateSchoolGeneralData() {

    this.recordStatus = null;
    this.validationErrors = null;
    if (!this.graduateschoolForm.pristine) {
    
      this.recordStatus = null;
      let validator = new GraduateSchoolValidator();
     
      let [errorsExist, errors] = validator.validateGraduateSchoolRecord(this.graduateschoolForm.value);
     
      if (errorsExist) {
        this.validationErrors = errors;
      }
      else {
        if (this.addMode) {
    
          this.service.addNewGraduateSchoolData('graduate_schools', this.graduateschoolForm.value).then(result => this.processSaveResponse('graduate_schools', result)).catch(error => console.log(error));
        }
        else {
        
          this.service.updateGraduateSchoolData('graduate_schools', this.graduateschoolForm.value).then(result => this.processSaveResponse('graduate_schools', result)).catch(error => console.log(error));
        }
      }

    }
    else {
      this.showRecordStatus('No changes have been made.');
    }
  }

  closeSubDetail() {
    this.detailForms.detailVisible = false;
    this.detailForms.validationErrors = null;
  }

  submitGraduateSchoolChildData() {
  
    if (!this.detailForms.comments.formGroup.pristine) {
      this.detailForms.recordStatus = null;
      let validator = new GraduateSchoolValidator();
      this.validationErrors = null;
      let [errorsExist, errors] = validator.validateChildRecord('comments', this.detailForms.comments.formGroup.value);
    
      if (errorsExist) {
        this.detailForms.validationErrors = errors;
    
        
      }
      else {
        if (this.detailForms.addMode) {
          this.service.addNewGraduateSchoolData('comments', this.detailForms.comments.formGroup.value).then(result => this.processSaveResponse('comments', result)).catch(error => console.log(error));

        } else {
          this.service.updateGraduateSchoolData('comments', this.detailForms.comments.formGroup.value).then(result => this.processSaveResponse('comments', result)).catch(error => console.log(error));
        }
      }



    }
    else {
      this.showRecordStatus('No changes have been made.');

    }



  }



}
