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
@Input() currentStudent;
formControls = {
    last_name: new FormControl('',  Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern("[0-9]{5}")])),
    first_name: new FormControl(''),
    mailing_address_line_1: new FormControl(''),
    mailing_address_line_2: new FormControl(''),
    mailing_address_city: new FormControl(''),
    mailing_address_state: new FormControl(''),
    mailing_address_zipcode: new FormControl(''),
    phone_number: new FormControl(''),
    email_address: new FormControl(''),

}


private validationErrors = null;
alumniForm = new FormGroup(this.formControls);
public currentDetailTab = 'degrees';
public subDetailVisible: boolean = false;


  constructor(private service: AlumniService) { }

  ngOnInit() {
    
  }

  loadStudentData(student) {
    this.alumniForm.patchValue(student.alumni);
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
      
      this.currentStudent.alumni = response.data;
      this.alumniForm.patchValue(this.currentStudent.alumni);
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
     this.service.updateAlumni(this.currentStudent.alumni.student_id, this.alumniForm.value).then(result => this.processSaveResponse(result));
     


    }
    
  }
  }
}
