import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModule } from './employees/employee.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared/shared.module';
import { EmployeeRoutingModule } from './employees/employee-routing.module';
import { HomeComponent } from './employees/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    EmployeeModule,
    AppRoutingModule,
    EmployeeRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
