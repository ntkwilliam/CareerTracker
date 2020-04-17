import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HTTP_ROOT, APPLICATION_PORT } from '../../../../configuration/globals';
var validator =  require('../../../../validations/admin')
@Injectable()
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  public getUserList() {
    
      return this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/userList`).toPromise();



  }

  public disableUser(username: string) {
   
    if (username != null) {
      return this.httpClient.post(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/disableUser`, {
        params: {
          user_id: username
        }
      }).toPromise();

    }

  }

  public enableUser(username: string) {
    if (username != null) {
      return this.httpClient.post(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/enableUser`, {
        params: {
          user_id: username
        }
      }).toPromise();

    }

  }

  public getUserByID(username: string) {
    return this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/userbyid/` + username).toPromise(); 
  }


  public updateUser(data) {
    return new Promise((resolve, reject) => {
      
      let userValidator = new validator();
      let result = userValidator.validateUser(data.user);
      if (result != true) {
        reject(result);
      }
      else { 
      this.httpClient.put(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/userData`,data).toPromise()
      .then(result => resolve()).catch(error => { 
        
        reject(error);



      });


    }

    });
  


  }



  public addUser(data) {

    return new Promise((resolve, reject) => {
      
      let userValidator = new validator();
      let result = userValidator.validateUser(data);
      if (result != true) {
        reject(result);
      }
      else { 
  
      this.httpClient.post(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/userData`,data).toPromise()
      .then(result => resolve(null)).catch(error => { 
        
        reject(error);



      });


    }

    });



  }



  public deleteUser(username: string) {
    return this.httpClient.delete(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/userData`, { 
      params: { 
      user_id: username
      }
    }).toPromise();
  }


 

  public changePassword(username: string, password: string, password_confirmation: string) {
    return new Promise((resolve,reject) => {

       
    let passwordValidator  = new validator();
    let result = passwordValidator.validatePassword(password, password_confirmation);
   
    if (result != true) {
      reject(result);
    } else {
      this.httpClient.post(`${HTTP_ROOT}:${APPLICATION_PORT}/admin/changePassword`, {
        params: {
          username: username,
          password: password,
          password_confirmation: password_confirmation
        }
      }).toPromise().then(result => {
        resolve(true);
      }).catch(error => {
        reject(error);
      });


    }
  



});

}


}
