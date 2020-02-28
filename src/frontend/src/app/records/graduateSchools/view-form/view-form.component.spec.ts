import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateSchoolViewFormComponent } from './view-form.component';

describe('EmployerViewFormComponent', () => {
  let component: GraduateSchoolViewFormComponent;
  let fixture: ComponentFixture<GraduateSchoolViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateSchoolViewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateSchoolViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
