import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { pipe } from 'rxjs';


export function employeeNameValidator(employees: EmployeeService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return employees.getEmployees()
      .pipe(
        map(employees => {

          const employee = employees.find(employee => employee.name.toLowerCase() === control.value.toLowerCase());

          return employee ? { employeeNameExist: true } : null;
        })
      );
  };
}


export function employeeEmailValidator(employees: EmployeeService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return employees.getEmployees()
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        map(employees => {

          // tslint:disable-next-line: no-shadowed-variable
          const employee = employees.find(employee => employee.email.toLowerCase() === control.value.toLowerCase());

          return employee ? { employeeEmailExist: true } : null;
        })
      );
  };
}


export function employeePhoneNumberValidator(employees: EmployeeService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return employees.getEmployees()
      .pipe(
        map(employees => {

          const employee = employees.find(employee => employee.phoneNumber === control.value);

          return employee ? { employeePhoneNumberExist: true } : null;
        })
      );
  };
}
