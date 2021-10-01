import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Employee } from '../models/employee.model';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-review-employee',
  templateUrl: './review-employee.component.html',
  styleUrls: ['./review-employee.component.css']
})
export class ReviewEmployeeComponent implements OnInit {
  employee: Employee;
  constructor(private mssgService: MessageService) {
  }

  ngOnInit(): void {

    this.mssgService.receiveData().subscribe(data => this.employee = data);
  }



}
