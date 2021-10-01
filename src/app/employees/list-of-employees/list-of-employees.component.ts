import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from 'src/app/models/IEmployee.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-employees',
  templateUrl: './list-of-employees.component.html',
  styleUrls: ['./list-of-employees.component.css']
})
export class ListOfEmployeesComponent implements OnInit {


  employees: IEmployee[];
  employee: IEmployee;

  constructor(private httpService: EmployeeService, private route: Router) { }

  ngOnInit(): void {
    this.httpService.getEmployees().subscribe(employees => this.employees = employees);
  }


  onEdit(employeeId: number): void {
    this.route.navigate(['/employees/edit', employeeId]);

  }

  addNew(): void {
    this.route.navigate(['/employees/create']);
  }

}

