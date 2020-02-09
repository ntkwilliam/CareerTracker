import { Component, OnInit, Output, Input, Injectable, ComponentFactoryResolver , Renderer2} from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'AlumniViewFormComponent',
  templateUrl: './alumni-view-form.component.html',
  styleUrls: ['./alumni-view-form.component.css']
})
@Injectable()
export class AlumniViewFormComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() currentAlumnus;
  private currentDetailTab = 'alumni_degrees';
  viewAllActive: boolean = false;
  constructor(private renderer: Renderer2) { }
  private currentCommentDetail = {};
  ngOnInit() {
    
    
  }

  
  toggleViewAllactive(comment) {
    this.currentCommentDetail = comment;
    this.viewAllActive = !this.viewAllActive;
    
  }
  

  changeDetailTab(newTab) {
    console.log(this.currentDetailTab);
    this.currentDetailTab = newTab;
  }

  

}
