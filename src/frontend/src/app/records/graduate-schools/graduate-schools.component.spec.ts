import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateSchoolsComponent } from './graduate-schools.component';

describe('GraduateSchoolsComponent', () => {
  let component: GraduateSchoolsComponent;
  let fixture: ComponentFixture<GraduateSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
