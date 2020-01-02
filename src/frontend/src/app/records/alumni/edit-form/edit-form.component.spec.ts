import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniEditFormComponent } from './edit-form.component';

describe('EditFormComponent', () => {
  let component: AlumniEditFormComponent;
  let fixture: ComponentFixture<AlumniEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
