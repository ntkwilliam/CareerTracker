import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AlumniComponent } from './records/alumni/alumni.component';
import { EmployersComponent } from './records/employers/employers.component';
import { GraduateSchoolsComponent } from './records/graduateSchools/graduateSchool.component';
import { ExportsReportsComponent } from './exports-reports/exports-reports.component';
import { ImportsComponent } from './imports/imports.component';
import { MainContentComponent } from './main-content/main-content.component';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthService]},
  {path: '', component: MainContentComponent, children: [

    { path: 'records/employers', component: EmployersComponent},
    { path: 'records/graduate-schools', component: GraduateSchoolsComponent},
    { path: 'records/alumni', component: AlumniComponent},
    { path: 'exports-reports', component: ExportsReportsComponent},
    { path: 'imports', component: ImportsComponent},
    { path: '', redirectTo: 'records/alumni', pathMatch: 'full' },



  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
