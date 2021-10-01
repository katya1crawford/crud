import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();


  constructor() { }

  sendData(data: any): void {

    this.subject.next(data);
  }

  receiveData(): Observable<any> {

    return this.subject.asObservable();
  }

}
