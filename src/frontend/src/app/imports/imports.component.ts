import { Component, OnInit } from '@angular/core';
import { ImportsService } from './imports.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent implements OnInit {

  constructor(private service: ImportsService) { }

  ngOnInit() {
  }

  public uploadForm = new FormGroup({
    file: new FormControl('')
  });

  public statusVisible = false;
  public error = null;
  public errorVisible = false;
  public submitVisible = true;
  public successVisible = false;
  public recordsProcessed = 0;
  uploadFile(files) {
    this.submitVisible = false;
    this.statusVisible = true;
    this.errorVisible = false;
    let formData = new FormData();
    formData.append('file', files.item(0), files.item(0).name);
    this.service.uploadFile(formData).then(res => {
      console.log(res);
      if (res['error']) {
       
        this.error = res;
        this.errorVisible = true;
        this.statusVisible = false;
      } else if (res['success']) {
        this.successVisible = true;
        this.statusVisible = false;
        this.recordsProcessed = res['rowsProcessed'];
      }
    }).catch(error => {
      this.error.errorMessage = error;
      this.errorVisible = true;
    });

  }


  resetForm() {
    this.submitVisible = true;
    this.statusVisible = false;
    this.errorVisible = false;
    this.successVisible = false;

  }


}

