import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumniComponent } from './records/alumni/alumni.component';
import { EmployersComponent } from './records/employers/employers.component';
import { GraduateSchoolsComponent } from './records/graduate-schools/graduate-schools.component';
import { ExportsReportsComponent } from './exports-reports/exports-reports.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { AlumniService } from './records/alumni/alumni.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AlumniEditFormComponent } from './records/alumni/edit-form/edit-form.component';
import { AlumniViewFormComponent } from './records/alumni/alumni-view-form/alumni-view-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AlumniComponent,
    EmployersComponent,
    GraduateSchoolsComponent,
    ExportsReportsComponent,
    NavigationComponent,
    AuthenticationComponent,
    AlumniEditFormComponent,
    AlumniViewFormComponent,
    
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
       { path: 'exports-reports', component: ExportsReportsComponent}
  
  
  
  ])
  ,HttpClientModule,
  FormsModule, 
  ReactiveFormsModule
  ],
  providers: [AlumniService],
  bootstrap: [AppComponent]
})
export class AppModule { }
