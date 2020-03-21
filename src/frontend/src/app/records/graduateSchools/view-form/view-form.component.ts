import { Component, OnInit, Output, Input, Injectable, ComponentFactoryResolver , Renderer2} from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'GraduateSchoolViewFormComponent',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
@Injectable()
export class GraduateSchoolViewFormComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() invokeEdit: EventEmitter<any> = new EventEmitter();
  @Input() currentGraduateSchool;
  
  public viewAllActive: boolean = false;
  public currentDetailTab = "comments";
  constructor(private renderer: Renderer2) { }
  public currentCommentDetail: any;
  
  ngOnInit() {
    
  }

  
  toggleViewAllactive(comment) {
    this.currentCommentDetail = comment;
    this.viewAllActive = !this.viewAllActive;
    
  }
  


  

}
