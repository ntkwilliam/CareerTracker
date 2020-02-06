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

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    
    
  }


  changeDetailTab(newTab) {
    console.log(this.currentDetailTab);
    this.currentDetailTab = newTab;
  }

}
