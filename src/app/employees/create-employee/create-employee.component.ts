import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ISkill } from 'src/app/models/ISkill.interface';
import { EmployeeService } from '../employee.service';
import { IEmployee } from 'src/app/models/IEmployee.interface';
import { employeeEmailValidator, employeeNameValidator, employeePhoneNumberValidator } from '../employee-info.validator';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  previewPhoto: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private httpService: EmployeeService) { }

  employeeForm: FormGroup;
  pageTitle: string;

  employee: IEmployee;

  closeResult: string;

  departments = ['IT', 'Marketing', 'Sales'];



  ngOnInit(): void {

    this.employeeForm = this.fb.group({

      name: [null,
        {
          validators: [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
          asyncValidators: [employeeNameValidator(this.httpService)],
          updateOn: 'blur'

        }],

      email: [null,

        {

          validators: [Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(random)\.com$')],
          asyncValidators: [employeeEmailValidator(this.httpService)],
          updateOn: 'blur'
        }],

      phoneNumber: [null,
        {
          validators: [Validators.required,
          Validators.pattern('[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*$'),
          Validators.minLength(10), Validators.maxLength(14)],
          asyncValidators: [employeePhoneNumberValidator(this.httpService)],
          updateOn: 'blur'

        }],

      gender: [null],
      contactPreference: [null],
      department: [null],
      dateOfBirth: [null],
      photoPath: [null],
      skills: this.fb.array([
        this.fb.group({
          skillName: [''],
          proficiency: [''],
          experienceInYears: ['']
        })])
    });

    // this.employeeForm.valueChanges.subscribe();

    this.activeRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getEmployee(id);
        this.pageTitle = 'Edit Employee';
      } else {
        this.employee = {
          id: null,
          name: '',
          contactPreference: '',
          email: '',
          skills: [],
          gender: '',
          phoneNumber: null,
          department: '',
          dateOfBirth: ''

        };
        this.pageTitle = 'Create New Employee';

      }
    });

  }



  getEmployee(id: number): void {
    this.httpService.getEmployee(id).subscribe(employee => {
      this.editEmployee(employee),
        this.employee = employee;
    });
  }

  editEmployee(employee: IEmployee): void {
    this.employeeForm.patchValue({
      name: employee.name,
      email: employee.email,
      gender: employee.gender,
      contactPreference: employee.contactPreference,
      phoneNumber: employee.phoneNumber,
      department: employee.department,
      dateOfBirth: employee.dateOfBirth,

    });
    this.employeeForm.setControl("skills", this.setEmployeeSkills(employee.skills));
  }


  setEmployeeSkills(skills: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skills.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        proficiency: s.proficiency,
        experienceInYears: s.experienceInYears

      }));
    });
    return formArray;
  }

  removeSkill(skillGroupIndex: number): void {

    const skillsFormArray = this.employeeForm.get('skills') as FormArray;
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }


  onSubmit() {
    this.mapValuesEmployeeForm();
    if (this.employee.id) {
      // tslint:disable-next-line: max-line-length
      this.httpService.updateEmployee(this.employee).subscribe(() => this.router.navigate(['/employees']), (error: any) => console.log(error));
    } else {
      this.httpService.addEmployee(this.employee).subscribe(() => this.router.navigate(['/employees']), (error: any) => console.log(error));
    }
  }

  mapValuesEmployeeForm(): void {
    this.employee.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.employee.name = this.employeeForm.value.name;
    this.employee.email = this.employeeForm.value.email;
    this.employee.phoneNumber = this.employeeForm.value.phoneNumber;
    this.employee.dateOfBirth = this.employeeForm.value.dateOfBirth;
    this.employee.department = this.employeeForm.value.department;
    this.employee.gender = this.employeeForm.value.gender;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.skills = this.employeeForm.value.skills;
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: [null, Validators.required],
      proficiency: [null],
      experienceInYears: [null]
    });
  }

  addSkillBtn(): void {

    const form = this.employeeForm.controls.skills as FormArray;
    form.push(this.addSkillFormGroup());
  }


}










