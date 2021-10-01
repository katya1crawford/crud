import { NgModule } from '@angular/core';
import { ListOfEmployeesComponent } from './list-of-employees/list-of-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { SharedModule } from '../shared/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';





@NgModule({
  declarations: [ListOfEmployeesComponent, CreateEmployeeComponent],
  imports: [
    BsDatepickerModule.forRoot(),

    SharedModule
  ]
})
export class EmployeeModule { }
