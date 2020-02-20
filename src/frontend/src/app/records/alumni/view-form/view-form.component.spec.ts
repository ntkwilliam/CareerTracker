import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniViewFormComponent } from './view-form.component';

describe('AlumniViewFormComponent', () => {
  let component: AlumniViewFormComponent;
  let fixture: ComponentFixture<AlumniViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniViewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
