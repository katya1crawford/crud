import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { IEmployee } from '../models/IEmployee.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:5000/employees';

  getEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError("PROBLEM HERE");
  }

  getEmployee(id: number): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.baseUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: IEmployee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
