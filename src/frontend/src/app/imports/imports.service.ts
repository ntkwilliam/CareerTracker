import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class ImportsService {

  constructor(private httpClient: HttpClient) { }


  public uploadFile(formData) {
    return this.httpClient.post("http://localhost:8080/upload", formData).toPromise();
    
  }







}
