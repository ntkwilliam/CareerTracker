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
import { ImportsComponent } from './imports/imports.component';
import { ImportsService } from './imports/imports.service';
import { AdminComponent } from './admin/admin.component';
import { MainContentComponent } from './main-content/main-content.component';
import { AuthService } from './auth.service'
import { AdminService } from './admin/admin.service'
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
    GraduateSchoolViewFormComponent,
    ImportsComponent,
    AdminComponent,
    MainContentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule, 
    HttpClientModule,
  FormsModule, 
  ReactiveFormsModule
  ],
  providers: [[AlumniService],[EmployerService], [GraduateSchoolService], [ImportsService], [AuthService], [AdminService]],
  bootstrap: [AppComponent]
})
export class AppModule { }
