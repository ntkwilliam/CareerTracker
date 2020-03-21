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

  public uploadForm =  new FormGroup ({
    file: new FormControl('')
  });

  public statusVisible = false;
  public errorMessages: string = null;
  public errorVisible = false;

  uploadFile(files) {
    this.statusVisible = true;
    this.errorVisible = false;
    console.log(files);
    let formData = new FormData();
    formData.append('file', files.item(0), files.item(0).name);
    this.service.uploadFile(formData).then(res => { 
      if (res['error']) {
        this.errorMessages = res['errorMessage'];
        this.errorVisible = true;
        this.statusVisible = false;
      }
    }).catch(error => { 

    });

  }

}
