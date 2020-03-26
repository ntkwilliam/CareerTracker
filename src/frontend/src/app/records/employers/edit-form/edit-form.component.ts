import { Component, OnInit, Output, Input, Injectable, ComponentFactoryResolver , Renderer2} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { EmployerService } from '../employer.service';
import { EmployerValidator } from '../employer.validator';
import { $ } from 'protractor';
@Component({
  selector: 'EmployerEditFormComponent',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
@Injectable()
export class EmployerEditFormComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  @Input() currentEmployer;
  @Input() addMode;
  public formControls = {
    employer_name: new FormControl(''),
    contact_name: new FormControl(''),
    address_line_1: new FormControl(''),
    address_line_2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipcode: new FormControl(''),
    phone_number: new FormControl(''),
    email_address: new FormControl(''),
    employer_id: new FormControl('')

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
public employerForm = new FormGroup(this.formControls);
public deleteConfirmationVisible: boolean = false;
public currentDetailTab = "comments";
  constructor(private service: EmployerService, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
    
    if (this.currentEmployer.employer != undefined) {
      this.loadEmployerData();
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

  loadEmployerData() {
    console.log(this.currentEmployer);
    this.employerForm.patchValue(this.currentEmployer.employer);

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

      this.service.deleteEmployerData(this.deleteRequest['recordType'], this.deleteRequest['recordID']).then(
        a => {

          if (this.deleteRequest['recordType'] == 'employers') {
            this.refreshData.emit();
            this.close.emit();
          }
          else {
          
            let index = this.currentEmployer[this.deleteRequest['recordType']].map(element => element[this.detailForms[this.deleteRequest['recordType']].keyField]).indexOf(this.deleteRequest['recordID']);
          this.currentEmployer[this.deleteRequest['recordType']].splice(index, 1);
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

      newRecord['entity_id'] = this.currentEmployer.employer['employer_id'];
      newRecord['entity_type'] = 'E';
      this.detailForms.currentRecord = newRecord;

      this.detailForms[detailType].formGroup.patchValue(newRecord);
  
    }
    else {

      this.service.getChildDetail(detailType, recordID).then(result => {
        console.log(result);
        this.detailForms.currentRecord = result['data'];

        this.detailForms[detailType].formGroup.patchValue(result['data']);


      });
    }
    this.detailForms.currentForm = detailType;
    this.detailForms.detailVisible = true;
  }








  processPhone(event) {
    let parsedValue = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);


    event.target.value = !parsedValue[2] ? parsedValue[1] : '(' + parsedValue[1] + ') ' + parsedValue[2] + (!parsedValue[3] ? '' : '-' + parsedValue[3]);

  }

  processZipCode(event) {
    let parsedValue = event.target.value.replace(/\D/g, '').match(/(\d{0,5})-?(\d{0,4})/);


    this.formControls.zipcode.patchValue(!parsedValue[2] ? parsedValue[1] : parsedValue[1] + '-' + parsedValue[2]);

  }


  processSaveResponse(recordType, response) {
    
    if (response.noChange) {
      this.showRecordStatus('No changes have been made.');
      return;
    }


    if (recordType == 'employers') {
      console.log("entering employers");
      if (response.validationError) {


        this.validationErrors = response.data;


      } else if (response.otherError) {



      } else if (this.addMode) {
        this.currentEmployer = {};
        
        this.currentEmployer.employer = response.data[0];
        console.log(this.currentEmployer);
        this.employerForm.patchValue(this.currentEmployer.employer);
        this.showRecordStatus('The record has been saved successfully.');
        this.employerForm.markAsPristine();
        this.addMode = false;

      }
      else {
        console.log(response);
        this.currentEmployer.employer = response.data;
        this.employerForm.patchValue(this.currentEmployer.employer);
        this.showRecordStatus('The record has been saved successfully.');
        this.employerForm.markAsPristine();
      }

    }
    else {
      if (response.validationError) {
        this.detailForms.validationErrors = response['data'];

      }
      else if (response.otherError) {

      }
      else if (this.detailForms.addMode) {
        if (this.currentEmployer[recordType] == undefined) {
          this.currentEmployer[recordType] = [];
        }
      
        this.currentEmployer[recordType].unshift(response['data'][0]);
        
        this.detailForms[recordType].formGroup.patchValue(response['data'][0]);
        this.detailForms.addMode = false;   
        
        this.showRecordStatus('The record has been saved successfully.');
      }
      else {

        let keyField = this.detailForms[recordType].keyField;
        let index = this.currentEmployer[recordType].map(element => element[keyField]).indexOf(this.detailForms.currentRecord[keyField]);
        this.currentEmployer[recordType].splice(index, 1, response['data']);
        this.showRecordStatus('The record has been saved successfully.');
        this.detailForms[recordType].formGroup.patchValue(response['data']);

        this.detailForms[recordType].formGroup.markAsPristine();
        this.detailForms.addMode = false;


      }
    }



  }


  submitEmployerGeneralData() {

    this.recordStatus = null;
    
    if (!this.employerForm.pristine) {

      this.recordStatus = null;
      let validator: EmployerValidator = new EmployerValidator();
      this.validationErrors = null;
      let [errorsExist, errors] = validator.validateEmployerRecord(this.employerForm.value);
      
      if (errorsExist) {
        this.validationErrors = errors;
      }
      else {
        if (this.addMode) {
          
          this.service.addNewEmployerData('employers', this.employerForm.value).then(result => this.processSaveResponse('employers', result));
        }
        else {

          this.service.updateEmployerData('employers', this.employerForm.value).then(result => this.processSaveResponse('employers', result));
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

  submitEmployerChildData() {
  
    if (!this.detailForms.comments.formGroup.pristine) {
      this.detailForms.recordStatus = null;
      this.detailForms.validationErrors = null;
      let validator: EmployerValidator = new EmployerValidator();
      this.validationErrors = null;
      let [errorsExist, errors] = validator.validateChildRecord('comments', this.detailForms.comments.formGroup.value);
      if (errorsExist) {
        this.detailForms.validationErrors = errors;
        console.log(this.detailForms.validationErrors);
        
      }
      else {
        if (this.detailForms.addMode) {
          this.service.addNewEmployerData('comments', this.detailForms.comments.formGroup.value).then(result => this.processSaveResponse('comments', result));

        } else {
          this.service.updateEmployerData('comments', this.detailForms.comments.formGroup.value).then(result => this.processSaveResponse('comments', result)

          );
        }
      }



    }
    else {
      this.showRecordStatus('No changes have been made.');

    }



  }



}
