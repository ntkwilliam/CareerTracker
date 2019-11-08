import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumniComponent } from './records/alumni/alumni.component';
import { EmployersComponent } from './records/employers/employers.component';
import { GraduateSchoolsComponent } from './records/graduate-schools/graduate-schools.component';
import { ImportsComponent } from './imports/imports.component';
import { ExportsReportsComponent } from './exports-reports/exports-reports.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthenticationComponent } from './authentication/authentication.component';


@NgModule({
  declarations: [
    AppComponent,
    AlumniComponent,
    EmployersComponent,
    GraduateSchoolsComponent,
    ImportsComponent,
    ExportsReportsComponent,
    NavigationComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
