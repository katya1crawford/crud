import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListOfEmployeesComponent } from './list-of-employees/list-of-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';


const appRoutes: Routes = [
  {
    path: 'employees', children: [{ path: '', component: ListOfEmployeesComponent },
    { path: 'create', component: CreateEmployeeComponent },
    { path: 'edit/:id', component: CreateEmployeeComponent }]
  }

];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
