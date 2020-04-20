import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerViewFormComponent } from './view-form.component';

describe('EmployerViewFormComponent', () => {
  let component: EmployerViewFormComponent;
  let fixture: ComponentFixture<EmployerViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerViewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
