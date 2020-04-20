import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service'
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
  
})
export class AdminComponent implements OnInit {


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.refreshUserList();
  }
  public deleteConfirmationVisible = false;
  public currentSection: string = 'UserMaintenance';
  public userList: any;
  public detailFormActive = false;
  public detailForm;
  public selecteduser_id;
  public recordStatus;
  public formGroups = {
  changePassword: new FormGroup({
    password: new FormControl(''),
    password_confirmation: new FormControl('')
  }),
  addEdit: new FormGroup({
    user_id: new FormControl(''),
    last_name: new FormControl(''),
    first_name: new FormControl(''),
    role: new FormControl('')
  })
};

  public validation_errors = {
    changePassword: {
      password: null,
      password_confirmation: null
    },
    addEdit: {
      user_id: null,
      last_name: null,
      first_name: null,
      role: null
    }



  }

  refreshUserList() {
    this.adminService.getUserList().then(result => {
      this.userList = result;
      
    })
  }

  disableUser(user_id: string) {
    this.adminService.disableUser(user_id).then(result => this.refreshUserList());
    
  }

  enableUser(user_id: string) {
    this.adminService.enableUser(user_id).then(result => {
    this.refreshUserList();
  }
    );
  }


  launchDetailForm(detailForm:string, user_id:string) {

    this.selecteduser_id = user_id;
    this.detailFormActive = true;
    this.detailForm = detailForm;



  }

  submitUser() {
    if  (this.selecteduser_id != null) {
      this.updateRecord();
    } else {
      this.addRecord();
    }
  


  }

  updateRecord () {
    this.adminService.updateUser({
      user_id: this.selecteduser_id,
      user: this.formGroups.addEdit.value
    }).then(b => {
      this.refreshUserList();
      this.showRecordStatus('The record was saved successfully.');
    }).catch(error => {
      
      if (error.last_name != null || error.first_name != null || error.user_id != null || error.role != null) {
        this.validation_errors.addEdit = error;
      }
    });
  }

  addRecord () {
    this.adminService.addUser(
      this.formGroups.addEdit.value
    ).then(b => {
      this.showRecordStatus('The record was saved successfully.');
      this.refreshUserList();
    }).catch(error => {
      
      if (error.last_name != null || error.first_name != null || error.user_id != null || error.role != null) {
        this.validation_errors.addEdit = error;
      }
    });
  }


  editRecord(user_id: string) {
    this.adminService.getUserByID(user_id).then(result => {
      
      this.formGroups.addEdit.patchValue(result);
      this.launchDetailForm('addEdit',user_id);
    });
  }

  newRecord() {
    this.formGroups['addEdit'].reset();
    this.launchDetailForm('addEdit',null);
    this.selecteduser_id = null;
  }

processPasswordChange() {
  this.validation_errors.changePassword.password = null;
  this.validation_errors.changePassword.password_confirmation = null;
  
  this.adminService.changePassword(this.selecteduser_id, this.formGroups.changePassword.value['password'], this.formGroups.changePassword.value['password_confirmation'] ).
  then(result => {
    if (result == true) {
      this.showRecordStatus('The record was saved successfully.');
    }
  }).catch(error => {
   
    if (error.password != undefined || error.password_confirmation != undefined) {
      this.validation_errors.changePassword.password = error.password;
      this.validation_errors.changePassword.password_confirmation = error.password_confirmation;
      
    }
  });





}

public cancelDelete() {
    this.selecteduser_id = null;
    this.deleteConfirmationVisible = false;
}


requestDelete(user_id: string) {
  this.selecteduser_id =  user_id;
  this.deleteConfirmationVisible = true; 
}

deleteRecord() {
  this.adminService.deleteUser(this.selecteduser_id).then(result => { 
    this.refreshUserList();
    this.selecteduser_id = null;
    this.deleteConfirmationVisible = false;
    
  }).catch(error => console.log(error));
}

showRecordStatus(status) {
 
    this.recordStatus = status;
    setTimeout(function () {
      this.recordStatus = null;
    }.bind(this), 3000);
 

}


  closeDetailForm() {
    this.selecteduser_id = null;
    this.detailFormActive = false;
    this.formGroups[this.detailForm].reset();
    Object.keys(this.validation_errors[this.detailForm]).forEach(key => {
      this.validation_errors[this.detailForm][key] = null;
      
      
    });
   
    this.detailForm = null;

  }



  processCurrentRecord() {
    Object.keys(this.validation_errors[this.detailForm]).forEach(key => {
      this.validation_errors[this.detailForm][key] = null;
      
      
    });
    switch (this.detailForm) {

      case 'changePassword':
        this.processPasswordChange();
        break;
        case 'addEdit':
          this.submitUser();
          break;






    }
  }





}
