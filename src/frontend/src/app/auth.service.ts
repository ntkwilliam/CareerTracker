import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HTTP_ROOT, APPLICATION_PORT } from '../../../configuration/globals';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private httpClient: HttpClient, private router: Router) { }

  canActivate() : Promise<boolean> {
   
    return new Promise((resolve) => {
    this.httpClient.get(`${HTTP_ROOT}:${APPLICATION_PORT}/currentUser`).toPromise().then(result => {
      console.log(result);
      if (result['role'] != undefined) {
        switch (result['role']) {
          case 'A':
            resolve(true);
            break;
          case 'user':
            this.router.navigate(['']);
            resolve(false);
            break;
          default:
            this.router.navigate(['']);
            resolve(false);
            break;

        }
      
      } else {
    
        this.router.navigate(['']);
        resolve(false);
      }
      
    }).catch(error => {
      console.log(error);
      this.router.navigate(['']);
      resolve(false);
    });
 
  });

  }



}
