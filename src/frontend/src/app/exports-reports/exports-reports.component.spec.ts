import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsReportsComponent } from './exports-reports.component';

describe('ExportsReportsComponent', () => {
  let component: ExportsReportsComponent;
  let fixture: ComponentFixture<ExportsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
