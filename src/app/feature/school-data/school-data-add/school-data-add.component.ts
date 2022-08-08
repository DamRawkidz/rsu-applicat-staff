import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { SchoolService } from 'src/app/core/service/school.service';
import { ProvinceService } from 'src/app/core/service/province.service';
import { StatusService } from 'src/app/core/service/status.service';
import { CountryService } from 'src/app/core/service/country.service';
import { DistrictsService } from 'src/app/core/service/districts.service';
import { SubDistrictService } from 'src/app/core/service/sub-district.service';

@Component({
  selector: 'school-data-add',
  templateUrl: './school-data-add.component.html',
  styleUrls: ['./school-data-add.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolDataAddComponent extends BaseForm implements OnInit {
  province = []
  statusData = []
  schoolData = []
  countryData = []
  districtsData = []
  subDistrictsData = []
  constructor(public FormBuilder: FormBuilder,
    public ProvinceService: ProvinceService,
    public SchoolService: SchoolService,
    public StatusService: StatusService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public CountryService: CountryService,
    public DistrictsService: DistrictsService,
    public SubDistrictService: SubDistrictService,
    public appSV: AppService,
  ) {
    super(FormBuilder, activeRoute)
    this.ProvinceService.getAllGemeral().subscribe(x => {
      this.province = x
    })
    this.CountryService.getAllGemeral().subscribe(x => {
      this.countryData = x
    })
    this.StatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.statusData = x
    })
    this.SchoolService.getAllGemeral().subscribe((x: any) => {
      console.log(x)
      this.schoolData = x

    })
  }

  ngOnInit(): void {
    console.log(String(this.id))
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.SchoolService.getDateGemeral(this.id).subscribe((res: any) => {
          this.form.patchValue({
            school_id: res.school_id,
            school_code: res.school_code,
            school_name_th: res.school_name_th,
            school_name_en: res.school_name_en,
            province_code: res.province_code,
            status: res.status,
            create_by: res.create_by,
            create_datetime: res.create_datetime,
            update_by: res.update_by,
            update_datetime: res.update_datetime,
            update_program: res.update_program,
            remark: res.remark,
            address1_th: res.address1_th,
            address2_th: res.address2_th,
            postal_code: res.postal_code,
            address1_en: res.address1_en,
            address2_en: res.address2_en,
            phone_no: res.phone_no,
            fax_no: res.fax_no,
            url: res.url,
            country_id: res.country_id,
            contact: res.contact,
            province_id: res.province_id,
            district_id: res.district_id,
            sub_district_id: res.sub_district_id,
            school_type: res.school_type,
            school_flag: res.school_flag,
            email: res.email,
          })
          setTimeout(() => {
            let i = this.schoolData.findIndex(x => x.school_code == res.school_code)
            console.log('code', i)
            if (i != -1) {
              this.schoolData.splice(i, 1)
            }
          }, 1500);

        })
        break;
      case 'add':

        break;
    }
  }
  close() {
    this.router.navigate(['app/school'])
  }
  save() {
    if (this.form.get('school_id').value != null) {
      this.SchoolService.updateGemeralNoId(this.form.getRawValue()).pipe(
        catchError(err => {
          // alert ตรงนี่
          if (err.error.err == 400) {
            this.appSV.swaltAlertError('', err.error.msg)
          } else {
            this.appSV.swaltAlertError('', 'Error')
          }
          return throwError(err)
        })).subscribe((x: any) => {
          console.log(x)
          // this.SubjectComponent.ngOnInit()
          this.router.navigate(['app/school'])
          this.appSV.swaltAlert()

        })
    } else {
      this.SchoolService.addGemeral(this.form.getRawValue()).pipe(
        catchError(err => {
          // alert ตรงนี่
          if (err.error.err == 400) {
            this.appSV.swaltAlertError('', err.error.msg)
          } else {
            this.appSV.swaltAlertError('', 'Error')
          }
          return throwError(err)
        })).subscribe((x: any) => {
          console.log(x)
          // this.SubjectComponent.ngOnInit()
          this.router.navigate(['app/school'])
          this.appSV.swaltAlert()
        })
    }

  }

  changeProvince(data) {
    this.DistrictsService.queryGemeral(`?province_code=${data.province_code}`).pipe(
      tap((x: any) => this.districtsData = x)
    ).subscribe()
  }
  changeDistricts(data) {
    this.SubDistrictService.queryGemeral(`?district_code=${data.district_code}&district_id=${data.district_id}`).pipe(
      tap((x: any) => console.log(x)),
      tap((x: any) => this.subDistrictsData = x)
    ).subscribe()
  }

  createForm() {
    return this.baseFormBuilder.group({
      school_id: [null, [Validators.required]],
      school_code: [''],
      school_name_th: ['', [Validators.required]],
      school_name_en: [''],
      province_code: [''],
      status: ['Y'],
      create_by: [null],
      create_datetime: [null],
      update_by: [null],
      update_datetime: [null],
      update_program: [null],
      remark: [''],
      address1_th: [''],
      address2_th: [''],
      postal_code: [''],
      address1_en: [''],
      address2_en: [''],
      phone_no: [''],
      fax_no: [''],
      url: [''],
      country_id: [null],
      contact: [''],
      province_id: [null],
      district_id: [null],
      sub_district_id: [null],
      school_type: [null],
      school_flag: [null],
      email: [null],

    })
  }
}
