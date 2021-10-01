import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';
import { ListOfEmployeesComponent } from './employees/list-of-employees/list-of-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { ReviewEmployeeComponent } from './review-employee/review-employee.component';
import { HomeComponent } from './employees/home/home.component';


const appRoutes: Routes = [
  { path: 'list', component: ListOfEmployeesComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'review', component: ReviewEmployeeComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },

];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: NoPreloading }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
