import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface Employee {
  employee_code: string;
  prefix_name_th: string;
  prefix_name_en: string;
  first_name_th: string;
  first_name_en: string;
  last_name_th: string;
  last_name_en: string;
  display_name_th: string;
  display_name_en: string;
  faculty_code: string;
  faculty_name_th: string;
  faculty_name_en: string;
  is_quit: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    public http: HttpClient
  ) { }

  searchEmployees(employeeCode: string){
    return this.http.get<Employee[]>(`${environment.rsuCommon}/api/studies/employees?employee_code=${employeeCode}`)
  }

  
}
