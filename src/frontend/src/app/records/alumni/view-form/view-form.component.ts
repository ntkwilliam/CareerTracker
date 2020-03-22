import { Component, OnInit, Output, Input, Injectable, ComponentFactoryResolver , Renderer2} from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'AlumniViewFormComponent',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
@Injectable()
export class AlumniViewFormComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() invokeEdit: EventEmitter<any> = new EventEmitter();
  @Input() currentAlumnus;
  public currentDetailTab = 'alumni_degrees';
  public viewAllActive: boolean = false;
  constructor(private renderer: Renderer2) { }
  public currentCommentDetail: any;
  ngOnInit() {
    
    
  }

  
  toggleViewAllactive(comment) {
    this.currentCommentDetail = comment;
    this.viewAllActive = !this.viewAllActive;
    
  }
  

  changeDetailTab(newTab) {
    
    this.currentDetailTab = newTab;
  }

  

}
