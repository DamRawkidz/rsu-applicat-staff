import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import {catchError, concatMap, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators'
import { BaseForm } from 'src/app/core/base/base-form';
import { STATEFORM } from 'src/app/core/enum/state';
import { AppService } from 'src/app/core/service/app.service';
import { Employee, EmployeesService } from 'src/app/core/service/common/employees.service';
import { ApplicationRoleService } from 'src/app/core/service/security/application-role.service';
import { ApplicationUserService, ApplicationUser } from 'src/app/core/service/security/application-user.service';


@Component({
  selector: 'app-application-user-form',
  templateUrl: './application-user-form.component.html',
  styleUrls: ['./application-user-form.component.css']
})
export class ApplicationUserFormComponent extends BaseForm implements OnInit {
  @ViewChild('inputEmail') inputEmil: ElementRef<HTMLInputElement>
  employee$ = new Observable<Employee[]>()
  user = []
  role = []
  departments = []


  public get userRoleFormArray(): FormArray {
    return this.form.get('app_user_roles') as FormArray
  }


  constructor(
    public activeRoute: ActivatedRoute,
		public fb: FormBuilder,
    // private userSV: UserService,
    private roleSV: ApplicationRoleService,
    private applicationUserSV: ApplicationUserService,
    private appSV: AppService,
    private location: Location,
    private emloyeeSV: EmployeesService,
  ) {
    super(fb,activeRoute)

  }

  ngOnInit(): void {
    
    
    this.roleSV.getAll().pipe(
      tap(res => this.role = [...res])
    ).subscribe()


    switch (this.state) {
      case STATEFORM.ADD:

      break;
      case STATEFORM.EDIT:
          this.applicationUserSV.get<ApplicationUser>(this.id).pipe(
            tap(res => this.form.patchValue(res)),
            tap(() => this.userRoleFormArray.clear()),
            tap(res => this.inputEmil.nativeElement.value = res.login_name),
            tap((res: any) => res.app_user_roles.map(role => this.userRoleFormArray.push(this._addForm(role)))),
            // concatMap(() => this.onSearchEmail()),
          ).subscribe()
      break;
    }

    try {
      this.employee$ = this.form.get('code').valueChanges.pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap(code => this.emloyeeSV.searchEmployees(code)),
        map(emp => emp),
        catchError(err => {
          return of([])
        })
      ) 
    } catch (error) {
      
    }
  }

  selectUser(emp: Employee){
    this.form.get('display_name').setValue(emp.display_name_th)
    this.form.get('login_name').setValue(emp.employee_code)
  }




  addRole(){
    this.userRoleFormArray.push(this._addForm())
  }

  removeRole(index: number){
    this.userRoleFormArray.removeAt(index)
  }

  save(){
    const req = this.form.getRawValue()
    const save$ = this.state === STATEFORM.ADD ? this.applicationUserSV.add(req) : this.applicationUserSV.update(req)
    save$.pipe(
      tap(() => this.state === STATEFORM.ADD ? this.appSV.swaltAlert('บันทึก','บันทึกสำเร็จ') : this.appSV.swaltAlert('อัพเดรต','อัพเดรตสำเร็จแล้ว')),
      catchError(err => {
        this.appSV.swaltAlertError('ผิดพลาด',err.message)
        return throwError(err)
      })
    ).subscribe()
  }

  createForm(){
    return this.baseFormBuilder.group({
        code: [''],
        app_user_id: [null],
        login_name: [''],
        display_name: [''],
        app_user_type_id: [null],
        app_user_roles: this.baseFormBuilder.array([
          this._addForm()
        ])
    })
  }

  private _addForm(item?){
    if(!item) return this.baseFormBuilder.group({
      app_user_id: [null],
      app_role_id: [null],
    })

    if(item) return this.baseFormBuilder.group({
      app_user_id: [item.app_user_id],
      app_role_id: [item.app_role_id],
    })
  }

  back(){
    this.location.back()
  }

  onSelectUser(user: any){
    this.form.patchValue({
      login_name: user.email,
      display_name: user.name
    })
  }
}
