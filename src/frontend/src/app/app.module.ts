import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumniComponent } from './records/alumni/alumni.component';
import { EmployersComponent } from './records/employers/employers.component';
import { GraduateSchoolsComponent } from './records/graduate-schools/graduate-schools.component';
import { ImportsComponent } from './imports/imports.component';
import { ExportsReportsComponent } from './exports-reports/exports-reports.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AlumniService } from './records/alumni/alumni.service';

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
    AppRoutingModule,
    RouterModule.forRoot([
       { path: '', redirectTo: 'records/alumni', pathMatch: 'full' },
       { path: 'records/employers', component: EmployersComponent},
       { path: 'records/graduate-schools', component: GraduateSchoolsComponent},
       { path: 'records/alumni', component: AlumniComponent},
       { path: 'imports', component: ImportsComponent},
       { path: 'exports-reports', component: ExportsReportsComponent}
  
  
  
  ])
  ,HttpClientModule,
  FormsModule
  ],
  providers: [AlumniService],
  bootstrap: [AppComponent]
})
export class AppModule { }
