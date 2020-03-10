import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumniComponent } from './records/alumni/alumni.component';
import { EmployersComponent } from './records/employers/employers.component';
import { GraduateSchoolsComponent } from './records/graduateSchools/graduateSchool.component';
import { ExportsReportsComponent } from './exports-reports/exports-reports.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { AlumniService } from './records/alumni/alumni.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AlumniEditFormComponent } from './records/alumni/edit-form/edit-form.component';
import { AlumniViewFormComponent } from './records/alumni/view-form/view-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployerEditFormComponent} from './records/employers/edit-form/edit-form.component';
import { EmployerViewFormComponent} from './records/employers/view-form/view-form.component';
import { EmployerService } from './records/employers/employer.service';
import { GraduateSchoolViewFormComponent } from './records/graduateSchools/view-form/view-form.component';
import { GraduateSchoolEditFormComponent } from './records/graduateSchools/edit-form/edit-form.component';
import { GraduateSchoolService } from './records/graduateSchools/graduateSchool.service';

@NgModule({
  declarations: [
    AppComponent,
    AlumniComponent,
    EmployersComponent,
    GraduateSchoolsComponent,
    ExportsReportsComponent,
    NavigationComponent,
    AlumniEditFormComponent,
    AlumniViewFormComponent,
    EmployerEditFormComponent,
    EmployerViewFormComponent,
    GraduateSchoolEditFormComponent,
    EmployerViewFormComponent,
    GraduateSchoolViewFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
       { path: '', redirectTo: 'records/alumni', pathMatch: 'full' },
       { path: 'records/employers', component: EmployersComponent},
       { path: 'records/graduate-schools', component: GraduateSchoolsComponent},
       { path: 'records/alumni', component: AlumniComponent},
       { path: 'exports-reports', component: ExportsReportsComponent},
        { path: '', component: NavigationComponent } ])
  
  
  
  
  ,HttpClientModule,
  FormsModule, 
  ReactiveFormsModule
  ],
  providers: [[AlumniService],[EmployerService], [GraduateSchoolService]],
  bootstrap: [AppComponent]
})
export class AppModule { }
