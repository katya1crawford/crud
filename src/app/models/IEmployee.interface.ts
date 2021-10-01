import { ISkill } from './ISkill.interface';

export interface IEmployee {
  id?: number;
  name: string;
  gender: any;
  email: string;
  phoneNumber: number;
  department: string;
  dateOfBirth: string;
  contactPreference?: any;
  skills: ISkill[];

}
