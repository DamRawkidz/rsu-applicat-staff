import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent, of, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap, takeUntil, filter, concatMap, catchError } from 'rxjs/operators';
import { EducationService, Education, Fees } from 'src/app/core/service/education.service';
import { ProgramsService, Course } from 'src/app/core/service/programs.service';
import { BaseForm } from 'src/app/core/base/base-form';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import swal from 'sweetalert2'
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { AddressService, Address } from 'src/app/core/service/addresses.service';
import { District } from 'src/app/core/service/districts.service';
import { PrefixService } from 'src/app/core/service/prefix.service';
import * as moment from 'moment';
import { realCitizenIdValidator } from 'src/app/shared/validators/real-citizen-id-validator';
import { School, SchoolService } from 'src/app/core/service/school.service';
import { CountryService, Country } from 'src/app/core/service/country.service';
import { UploadService } from 'src/app/core/service/upload.service';
import { ApplicantService, Applicant } from 'src/app/core/service/applicant.service';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { AppService } from 'src/app/core/service/app.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewDocComponent } from 'src/app/shared/components/preview-doc/preview-doc.component';
import { ProvinceService } from 'src/app/core/service/province.service';
import { EducationTypesService } from 'src/app/core/service/education-types.service';
import { ProgramTypesService } from 'src/app/core/service/program-types.service';
import { EducationLevelsService } from 'src/app/core/service/education-levels.service';
import { DatePipe } from '@angular/common';
import { PopupSearchProvinceComponent } from '../popup-search-province/popup-search-province.component';
import { PopupSearchSchoolComponent } from '../popup-search-school/popup-search-school.component';
import { CouponService } from 'src/app/core/service/coupon.service';

@Component({
  selector: 'program-register',
  templateUrl: './program-register.component.html',
  styleUrls: ['./program-register.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramRegisterComponent extends BaseForm implements OnInit, AfterViewInit {
  @Output() selectProgram = new EventEmitter()
  @ViewChild('courseInput', { static: true }) courseInput: ElementRef<HTMLInputElement>
  @ViewChild('programInput', { static: true }) programInput: ElementRef<HTMLInputElement>
  @ViewChild('file') upload: ElementRef<HTMLInputElement>
  @Output() onPreviewDoc = new EventEmitter<string>()

  educations = []
  provinces = []
  program = []
  educationsForm: Education[] = []
  documents = []
  courses: Course[] = []
  @Input() districts: District[]
  address: Address[] = []
  startDate: Date = new Date()
  prefixs = []
  programsType = []
  educationLevels = []
  school: School[] = []
  country: Country[] = []
  searchEnrollArray = []
  price: number = 0
  entollPrice = 0
  maximum_apply_course: number = 0
  a = new Date()
  isSelectSchool: boolean = false
  private isSelectSubDistrictName: boolean = false
  uploadFileIndex: number = 0
  public get getFormCoures(): FormArray {
    return this.form.get('applicantapply.courses') as FormArray
  }
  public get getFormDocuments(): FormArray {
    return this.form.get('applicantapply.documents') as FormArray
  }
  public get formfees(): FormArray {
    return this.form.get('applicantapply.fees') as FormArray
  }
  public get provinceCode(): string {
    return this.form.get('applicants.school_province_code').value
  }

  @ViewChild('age') age: ElementRef<HTMLInputElement>
  constructor(
    private router: Router,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    private ProgramsService: ProgramsService,
    private uploadSV: UploadService,
    private PrefixService: PrefixService,
    private AddressService: AddressService,
    private applicantSV: ApplicantService,
    private ProgramTypesService: ProgramTypesService,
    private EducationLevelsService: EducationLevelsService,
    private applicantApplys: ApplicantApplysService,
    private schoolSV: SchoolService,
    private DatePipe: DatePipe,
    private countrySV: CountryService,
    private provinceSV: ProvinceService,
    private dialog: MatDialog,
    private appSV: AppService,
    private cdRef: ChangeDetectorRef,
    private DocumentTypesService: DocumentTypesService,
    private EducationService: EducationService,
    private CouponService: CouponService,

  ) {
    super(FormBuilder, activeRoute)
    this.startDate = moment().subtract(18, 'years').toDate()
    this.ProgramsService.getSearch(1, 'open').subscribe((x: any) => {
      console.log(x)
      if(x == null){
        this.appSV.swaltAlertError('','ไม่พบโครงการที่เปิดรับสมัคร')
      }else{
        this.program = x.map(x => {
          return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
        })
      }

    })
    this.PrefixService.query('standard').subscribe((x: any) => {
      console.log(x)
      this.prefixs = x
    })
    this.EducationLevelsService.getAll().subscribe((x: any) => {
      this.educationLevels = x
    })
    this.ProgramTypesService.getAll().subscribe((x: any) => {
      this.programsType = x
    })
  }

  ngOnInit(): void {
    this.form.get('applicantapply.education_type_name_th').disable()
    this.form.get('applicantapply.academic_year_name').disable()
    this.form.get('applicantapply.academic_semester_name').disable()
    this.form.get('applicantapply.program_name').disable()

    this.form.get('applicantapply.courses').valueChanges.pipe(
      filter(courses => courses.lenght != 0),
      tap(courses => this.courses = [...courses]),
      map((courses: Course[]) => {
        // console.log('logging from EducationInformationComponent')
        // let courses:Course[] = this.form.get('applicantapply.courses').value as Course[]
        // console.log(courses)​
        let query = courses.map((course: any) => `program_course_id=${course.program_course_id}`).join('&')
        return query
      }),
      switchMap(query => {
        console.log(query)
        if (query) {
          return this.DocumentTypesService.query<DocumentType[]>(`program_courses?${query}`)
        } else {
          return []
        }

      }),
      tap(result => console.log('get doccuemnt from',result)),
      tap(() => this.documents = [...[]]),      
      tap(() => this.getFormDocuments.clear()),
      tap((result: DocumentType[]) => {
        this.documents = [...result]
        let newDoc = this.documents.filter((x,index,self:[]) => {
              return self.findIndex((s:any) => s.document_type_id == x.document_type_id) == index
        })

        this.documents = [...newDoc]
      }),
      tap((result: DocumentType[]) => this.documents.map(result => this.getFormDocuments.push(this.creatDocForm(result)))),
      // takeUntil(this.unsubAll$)
    ).subscribe()

    this.form.get('applicants.sub_district_name').valueChanges.pipe(
      debounceTime(500),
      tap(text => {
        if (!text) {
          this.address = [...[]]
          this.isSelectSubDistrictName = false
          this.form.get('applicants').patchValue({
            province_name: '',
            district_name: '',
            sub_district_code: '',
            postal_code: ''
          })
        }
        this.cdRef.detectChanges()
      }),
      // filter((text:string) => text.length >= 3),
      switchMap(text => this.AddressService.query(`?name_th=${text}`)),
      tap((address: Address[]) => this.address = [...address]),
      tap(() => console.log(this.address)),
      tap(() => this.cdRef.detectChanges())
    ).subscribe()

    this.form.get('applicants.school_name').valueChanges.pipe(
      debounceTime(500),
      tap(text => {
        if(this.form.get('applicants.foreign_school_flag').value){
          this.form.get('applicants.school_country_code').setValue(text)
        }
      }),
      filter((text: string) => !this.form.get('applicants.foreign_school_flag').value),
      switchMap(text => this.schoolSV.querySearch(`?school_name_th=${text}&province_code=${this.form.get('applicants.school_province_code').value}`)),
      tap((school: School[]) => this.school = [...school]),
      tap((school: School[]) => this.cdRef.detectChanges()),
      // takeUntil(this.unSubAll$)
    ).subscribe()
    
    this.form.get('applicantapply.program_code').valueChanges.pipe(
      debounceTime(500),
      tap((code) => {
        console.log(code)
        if (code == '') {
          this.form.get('applicantapply.program_code').setValue('')
          this.form.get('applicantapply.program_name').setValue('')
          this.form.get('applicantapply.education_type_name_th').setValue('')
          this.form.get('applicantapply.academic_year_name').setValue('')
          this.form.get('applicantapply.academic_semester_id').setValue(null)
          this.form.get('applicantapply.academic_semester_name').setValue('')
          this.form.get('applicantapply.academic_year_id').setValue(null)
          this.form.get('applicantapply.program_id').setValue(null)
          this.form.get('applicantapply.program_schedule_id').setValue(null)
          this.maximum_apply_course = 0
          this.getFormCoures.clear()
        }

      }),
    ).subscribe()

    this.form.get('applicants.school_country_name').valueChanges.pipe(
      debounceTime(500),
      // filter((text:string) => text.length >= 3),
      tap(x=>{
        if(x == '' || x == null){
          this.form.get('applicants.school_country_id').setValue(null)
          this.form.get('applicants.school_country_code').setValue(null)
        }
      }),
      switchMap(text => this.countrySV.queryGemeral(`?search=${text}`)),
      map((country: Country[]) => {
         return country.filter((e,index,self:any[])  => {
           return  self.findIndex(s => s.country_name_th == e.country_name_th) == index
         })
      }),
      tap((country: Country[]) => this.country = [...country]),
      tap((country: Country[]) => this.cdRef.detectChanges()),
      // takeUntil(this.unSubAll$)
    ).subscribe()


    this.form.get('applicants.school_province_name').valueChanges.pipe(
      debounceTime(500),
      tap(x => console.log(x)),
      switchMap(text => this.provinceSV.queryGemeral(`?province_name_th=${text}`)),
      tap(x => console.log(x)),
      tap((result: any) => this.provinces = [...result]),
      tap(() => this.cdRef.detectChanges()),
      tap(x => console.log(x)),
      // takeUntil(this.unSubAll$),
      catchError(err => {
        return of([])
      })
    ).subscribe(
      () => { },
      (err) => {
        alert('err')
      }
    )


  }

  onChangeForeignSchoolFlag() {
    this.form.get('applicants.foreign_school_flag').valueChanges.pipe(
      tap(chcked => {
        if (chcked) {
          this.form.get('applicants').patchValue({
            school_province_name: '',
            school_province_code: '',
            school_name: '',
            school_code: ''
          })
          this.school = [...[]]
        } else {

        }
      }),
      // takeUntil(this.unSubAll$),
    ).subscribe()
  }
  selectProvincSchool(provinc) {
    this.form.get('applicants.school_province_id').setValue(provinc.province_id)
    this.form.get('applicants.school_province_code').setValue(provinc.province_code)
  }
  selectSchool(school: School) {
    this.isSelectSchool = true
    this.form.get('applicants.school_code').setValue(school.school_code)
  }
  selectCountry(coutnry: Country) {
    console.log(coutnry)
    this.form.get('applicants.school_country_id').setValue(coutnry.country_id)
    this.form.get('applicants.school_country_code').setValue(coutnry.country_code)
  }
  selectAddress(event, address: Address) {
    this.isSelectSubDistrictName = true
    this.form.get('applicants').patchValue({
      province_name: address.province_name_th,
      district_name: address.district_name_th,
      sub_district_code: address.sub_district_code,
      postal_code: address.postal_code
    })
  }
  onSelectProgram(program) {
    console.log(program)
    // this.form.get('applicantapply.courseName').setValue(program.name_th)
  }
  _previewDoc(url: string) {
    // this.onPreviewDoc.emit(url)

    const dialogRef = this.dialog.open(PreviewDocComponent, {
      width: '90vw',
      height: '90vh',
      data: url
    })

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    })
  }
  dateChange(date: moment.Moment) {
    this.form.get('applicants.date_of_birth').setValue(moment(date).add(7, 'hours').toDate())
    let todayDate = moment()
    let calculateAge = todayDate.diff(date, 'years')
    // this.form.get('age').setValue(calculateAge)
    this.age.nativeElement.value = calculateAge.toString()
    console.log(calculateAge)

  }
  gotoResultEnrollPage() {
    this.router.navigate(['app/result-enroll'])
  }

  gotoRegister() {
    this.router.navigate(['app/register'])
  }

  goResultSelection() {
    this.router.navigate(['app/result-selection'])
  }

  gotoSearch() {
    this.router.navigate(['app/search'])
  }
  changeProgram(data) {
    console.log(data)
    this.form.get('applicantapply.education_type_name_th').setValue(data.education_type_name_th)
    this.form.get('applicantapply.academic_year_name').setValue(data.academic_year_code)
    this.form.get('applicantapply.academic_semester_id').setValue(data.academic_semester_id)
    this.form.get('applicantapply.academic_semester_name').setValue(data.academic_semester_name_th)
    this.form.get('applicantapply.academic_year_id').setValue(data.academic_year_id)
    this.form.get('applicantapply.program_id').setValue(data.program_id)
    this.form.get('applicantapply.program_schedule_id').setValue(data.program_schedule_id)
    this.maximum_apply_course = data.maximum_apply_course



  }
  openPopup() {
    const dialogRef = this.dialog.open(PopupSearchProvinceComponent, {
      width: '70vw',
      height: '70vh ',
      data: this.form
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openPopupSchool() {
    const dialogRef = this.dialog.open(PopupSearchSchoolComponent, {
      width: '70vw',
      height: '70vh ',
      data: this.form
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  selectCourse(course) {
    if (this.maximum_apply_course === this.getFormCoures.length) {
      swal.fire({
        icon: 'warning',
        text: `คุณสามารถเลือกหลักสูตรได้เพียง ${this.maximum_apply_course} หลักสูตรในโครงการนี้`
      })
      this.form.get('applicantapply.courseName').setValue('')
      return
    }
    console.log(course)
    // this.store.dispatch(UPDATE_FACULTY_NAME({facultyName: course.name_th}))
    let i = this.form.get('applicantapply.courses').value.findIndex(x => x.program_course_id == course.program_course_id)
    if (i == -1) {
      this.form.get('applicantapply.courseName').setValue('')
      this.getFormCoures.push(this.createFormArray(course))
      let index = this.form.get('applicantapply.courses').value.length
      // let a = result.applyPrices.find(x=>x.course_order_no == index)
      // console.log(a)
      // this.ProgramsService.getDate(this.form.get('applicantapply.program_id').value).pipe(
      //   tap(x=>{console.log(x)}),
      //   tap(x=>{
          let courses = this.form.get('applicantapply.courses').value
          let query = courses.map(course => `course_id=${course.program_course_id}`).join('&')   
          let programId = this.form.get('applicantapply.program_id').value     
          let queryString = `${programId}/fees?${query}`
          return this.ProgramsService.query<Fees[]>(queryString).pipe(
            tap(result => console.log(result)),
            tap(result => this.selectFree(result)),
            tap(result => result.forEach(x=>{
              this.entollPrice += x.amount
            })),
            // tap(result => this.entollPrice = result[0].amount)
          ).subscribe()
        // }),
        // tap((x: any) => { this.entollPrice = x.applyPrices.find(x=>x.course_order_no == index).price }),

        // map((x:any) => x.applyPrices.map(x => x.price).reduce((a,c) => a + c,0)),
        // tap(x=>{this.entollPrice = x})

      // ).subscribe()

    } else {
      swal.fire({
        icon: 'warning',
        text: `คุณเลือกหลักสูตรซ้ำ`
      })
      this.form.get('applicantapply.courseName').setValue('')
    }


  }
  selectProgramCode(program) {
    console.log(program)
    // this.store.dispatch(UPDATE_FACULTY_NAME({facultyName: course.name_th}))
    this.form.get('applicantapply.program_code').setValue(program.program_code)
    this.form.get('applicantapply.program_name').setValue(program.program_name_th)
    this.form.get('applicantapply.education_type_name_th').setValue(program.education_type_name_th)
    this.form.get('applicantapply.academic_year_name').setValue(program.academic_year_code)
    this.form.get('applicantapply.academic_semester_id').setValue(program.academic_semester_id)
    this.form.get('applicantapply.academic_semester_name').setValue(program.academic_semester_name_th)
    this.form.get('applicantapply.academic_year_id').setValue(program.academic_year_id)
    this.form.get('applicantapply.program_id').setValue(program.program_id)
    this.form.get('applicantapply.program_schedule_id').setValue(program.program_schedule_id)
    this.maximum_apply_course = program.maximum_apply_course
    // this.form.get('applicantapply.program_code').setValue('')


  }
  removeCoures(index) {
    this.getFormCoures.removeAt(index)
  }
  search() {
    console.log('search')
    console.log(this.courseInput.nativeElement.value)
    let programeId = this.form.get('applicantapply.program_id').value
    console.log(programeId)
    this.EducationService.query<EducationService[]>(`${programeId}?full_name_th=`).pipe(
      tap((result: EducationService[]) => console.log(result)),
      tap((result: EducationService[]) => this.educations = [...result]),
      // tap(result => console.log(result)),
      tap(() => this.cdRef.detectChanges()),
    ).subscribe()
  }
  // searchProgram(){
  //   console.log('search program')
  //   console.log(this.programInput.nativeElement.value)
  //   let programeId = this.form.get('applicantapply.program_id').value
  //   console.log(programeId)
  //   this.EducationService.query<EducationService[]>(`${programeId}?full_name_th=`).pipe(
  //     tap((result: EducationService[]) => this.educations = [...result]),
  //     // tap(result => console.log(result)),
  //     tap(() => this.cdRef.detectChanges()),
  //   ).subscribe()
  // }
  uplodaFile(file: FileList) {
    const formData: FormData = new FormData();
    formData.append('file', file.item(0), file.item(0).name)
    this.uploadSV.uploadDocument(formData).subscribe((res: any) => {
      if (res.status == 'progress') {
        this.getFormDocuments.at(this.uploadFileIndex).patchValue({
          'progress': res.message
        })
        this.cdRef.detectChanges()
      }
      if (res.status == 'success') {
        let url: string = res.message[0].file_name
        this.getFormDocuments.at(this.uploadFileIndex).patchValue({
          document_url: url
        })
        this.cdRef.detectChanges()
        // console.log(this.form.getRawValue())
        swal.fire({
          icon: 'success',
          text: 'Upload Success',
        })
        // this._snackBar.open('Upload Success','',{
        //   duration: 1000 
        // })
      }

    })
  }
  saveCourseToGetFees() {
    if (this.form.get('applicantapply.courses').value.length) {
      let courses = this.form.get('applicantapply.courses').value
      let query = courses.map(course => `course_id=${course.program_course_id}`).join('&')   
      let programId = this.form.get('applicantapply.program_id').value     
      let queryString = `${programId}/fees?${query}`
      return this.ProgramsService.query<Fees[]>(queryString).pipe(
        tap(result => console.log(result)),
        tap(result => this.selectFree(result)),
        tap(result => result.map(fee => this.formfees.push(this.addFormFees(fee))))
      )
    } else {
      return of([])
    }
  }
  private selectFree(fee: Fees[]){
    fee.sort()
  }
  click_application_id() {
    if (this.form.get('applicantapply.application_id').value == null || this.form.get('applicantapply.application_id').value == '') {
      swal.fire({
        icon: 'error',
        text: 'กรุณากรอกเลขที่ใบสมัคร',
      })
    } else {
      this.applicantApplys.query(`?application_id=${this.form.get('applicantapply.application_id').value}`).pipe(
        tap((x: any) => console.log(x)),

        catchError(err => {
          console.log(err)
          swal.fire({
            icon: 'error',
            text: 'ไม่พบเลขที่ผู้สมัคร',
          })
          return throwError(err)
        }),
        tap((x: any) => this.router.navigate(['app/profile-detail/edit', x[0].applicant_apply_id])),
      ).subscribe()
    }

  }
  click_personal() {
    this.ProgramsService.getPersonalWithOutToken().pipe(
      catchError(err => {
        console.log(err)
        swal.fire({
          icon: 'error',
          text: 'ไม่พบข้อมูล',
        })
        return throwError(err)
      })
    ).subscribe((x: any) => {

      // let x = {"GetResult":{"address1":"199\/93   ซอยร่วมมิตรพัฒนา แยก 10 ","date_of_birth":"1996-05-20","district":"เขตบางเขน","first_name":"โชคชัย","gender":"1","last_name":"จันทร์เชย                                                                               ","personal_id":"3730101225600","province":"กรุงเทพมหานคร                                                                                           ","sub_district":"แขวงท่าแร้ง","title":"นาย"}}
      let res = x.GetResult
      let titleId
      if (res.title == 'นาย') {
        titleId = 3
      } else if (res.title == 'นาง') {
        titleId = 5
      } else {
        titleId = 4
      }
      let todayDate = moment()
      let calculateAge = todayDate.diff(res.date_of_birth, 'years')
      this.age.nativeElement.value = calculateAge.toString()
      console.log(calculateAge)

      this.form.get('applicants').patchValue({
        prefix_id: titleId,
        gender_id: Number(res.gender),
        first_name_th: res.first_name,
        last_name_th: res.last_name,
        date_of_birth: this.DatePipe.transform(res.date_of_birth, 'yyyy-MM-dd'),
        personal_id: res.personal_id

      })
    })
  }
  onSubmit() {
    if (!this.form.get('applicantapply.courses').valid) {
      this.form.get('applicantapply.courses').markAllAsTouched()
      swal.fire({
        icon: 'warning',
        text: 'กรุณาเลือกคอร์ส'
      })
      return
    }
    this.form.get('applicantapply.application_id').setValue(null)
    this.saveCourseToGetFees().pipe(
      concatMap(result => this.applicantSV.add<Applicant>(this.form.getRawValue().applicants)),
      tap(result => console.log(result)),
      concatMap(result => {
        let request = this.form.getRawValue().applicantapply
        request.applicant_id = result.applicant_id
        return this.applicantApplys.add(request).pipe(
          tap(x => console.log(x)),
          tap(x => this.applicantApplys.applicant_apply_id = x.applicant_apply_id),
          tap(x => this.applicantApplys.payin_no = x.application_id),
          tap(x => this.applicantApplys.payin_no = x.application_id),
        )
      }),
      catchError(err => {
        console.log(err)
        swal.fire({
          icon: 'error',
          text: 'Error',
        })
        return throwError(err)
      })



    ).subscribe(res => {
      console.log(res)
      this.detailPage()

      swal.fire({
        icon: 'success',
        text: 'Success',
      })
    })
  }
  
  testSave() {
    this.router.navigate(['app/profile-detail/edit', 360])
  }
  detailPage() {
    this.router.navigate(['app/profile-detail'])
  }
  inportContact(){
    
    this.router.navigate(['app/import_contact'])
  }
  searchEnroll(input) {
    console.log(input)
    this.applicantApplys.query(`?${'personal_id'}=${input}`).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      })
    )
      .subscribe((x: any) => {
        console.log(x)
        this.searchEnrollArray = x
      })
  }
  changePrefix(id) {
    if (id != '003') {
      this.form.get('applicants.gender_id').setValue(2)
    } else {
      this.form.get('applicants.gender_id').setValue(1)
    }
  }
  clickSearch(value) {
    console.log(value)
    this.gotEditPage(value)
    this.applicantApplys.idChange$.next(value)
  }
  onSubmitQrCode() {
    //   this.store.dispatch(UPDATE_PRESONAL_INFORMATION({
    //     firstName: this.form.getRawValue().applicants.first_name_th,
    //     lastName: this.form.getRawValue().applicants.last_name_th,
    //     email: this.form.getRawValue().applicants.email,
    //     phone: this.form.getRawValue().applicants.mobile,
    // }))

    // this.router.navigate(['/app/otp'])
    // otp
    // console.log(this.form.getRawValue().applicants)
    // this.applicantSV.add<Applicant>(this.form.getRawValue().applicants).subscribe()
    if (!this.form.get('applicantapply.courses').valid) {
      this.form.get('applicantapply.courses').markAllAsTouched()
      swal.fire({
        icon: 'warning',
        text: 'กรุณาเลือกคอร์ส'
      })
      return
    }
    this.saveCourseToGetFees().pipe(
      concatMap(result => this.applicantSV.add(this.form.getRawValue().applicants)),
      tap(result => console.log(result)),
      concatMap(result => {
        let request = this.form.getRawValue().applicantapply
        request.applicant_id = result.applicant_id
        console.log(request)
        return this.applicantApplys.add(request).pipe(
          tap(x => console.log(x)),
          tap((x: any) => this.applicantApplys.applicant_apply_id = x.applicant_apply_id),
          tap((x: any) => this.applicantApplys.payin_no = x.application_id),
        )
      }),
      catchError(err => {
        console.log(err)
        swal.fire({
          icon: 'error',
          text: 'Error',
        })
        return throwError(err)
      })



    ).subscribe(res => {
      console.log(res)
      swal.fire({
        icon: 'success',
        text: 'Success',
      })
      this.gotEditPage(res.applicant_apply_id)
      this.applicantApplys.idChange$.next(res.applicant_apply_id)
    })
  }
  selectFile(index: number) {
    this.uploadFileIndex = index
    this.upload.nativeElement.click()
  }
  getCoupon(id){
  console.log(id)
    this.CouponService.query(`?coupon_code=${id}`).pipe(
      catchError(err => {
        console.log(err)
        swal.fire({
          icon: 'error',
          text: 'ไม่มีคูปองส่วนลด',
        })
        return throwError(err)
      })
    ).subscribe((x:any)=>{
      this.form.get('applicantapply.coupon_id').setValue(x.coupon_id)
      swal.fire({
        icon: 'success',
        text: 'Success',
      })
    })
  }
  ngAfterViewInit(): void {
    fromEvent(this.courseInput.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => {
        let programeId = this.form.get('applicantapply.program_id').value
        return this.EducationService.query<EducationService[]>(`${programeId}?full_name_th=${text}`)
      }),
      tap((result: EducationService[]) => this.educations = [...result]),
      // tap(result => console.log(result)),
      // tap(() => this.cdRef.detectChanges()),
      // takeUntil(this.unsubAll$)      
    ).subscribe()


  }

  gotootpPage() {
    this.router.navigate(['app/enroll/otp'])
  }
  gotEditPage(id) {
    this.router.navigate(['app/profile-detail/edit', id])
  }
  // this.store.dispatch(GET_PROGRAME({payload: program}))   
  createForm() {
    return this.baseFormBuilder.group({
      applicants: this.createFormApplicants(),
      applicantapply: this.crateFormApplicantapply()
    })
  }
  createFormArray(coures: Education) {
    return this.baseFormBuilder.group({
      applicant_apply_course_id: [null],
      applicant_apply_id: [null],
      row_order: [0],
      program_course_id: [coures.program_course_id],
      course_name: [coures.name_th],
      course_code: [coures.id],
      major_code: [coures.major_code],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null]
    })
  }
  creatDocForm(doc: any) {
    return this.baseFormBuilder.group({
      applicant_apply_document_id: [null],
      applicant_apply_id: [null],
      document_type_id: [doc.document_type_id],
      document_type_name: [doc.document_type_name_th],
      document_name: [doc.document_type_name_th],
      document_url: [''],
      progress: [''],
      status_id: [doc.status_id],
      create_by: [doc.create_by],
      create_date: [doc.create_date],
      last_update_by: [doc.last_update_by],
      last_update_date: [doc.last_update_date],
    })
  }
  private createFormApplicants() {
    return this.baseFormBuilder.group({
      applicant_id: [null],
      sign_in_channel_id: [null],
      user_id: [null],
      title_id: [null],
      gender_id: [1, Validators.required],
      first_name_th: ['', Validators.required],
      last_name_th: ['', Validators.required],
      first_name_en: [''],
      middle_name_en: [''],
      last_name_en: [''],
      date_of_birth: [''],
      email: [''],
      mobile: [''],
      country_id: [null],
      country_name: [''],
      province_name: [{ value: '', disabled: true }],
      district_name: [{ value: '', disabled: true }],
      sub_district_name: [''],
      address1: [''],
      address2: [''],
      zipcode: [''],
      education_level_id: [null],
      education_level_name: [''],
      graduate_year: [''],
      graduate_from_id: [null],
      graduate_from_name: [''],
      major: [''],
      gpa: ['', Validators.required],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      program_type_id: [null],
      last_update_date: [null],
      sub_district_code: [''],
      postal_code: [{ value: '', disabled: true }],
      road: [''],
      soi: [''],
      school_code: ['', Validators.required],
      school_name: ['', Validators.required],
      moo: [''],
      prefix_code: [''],
      prefix_id: [null, Validators.required],
      personal_id: ['', [Validators.required, realCitizenIdValidator]],
      foreign_school_flag: [false],
      province_id: [null],
      school_country_code: [''],
      school_country_id: [null, Validators.required],
      school_country_name: [''],
      school_province_id: [null, Validators.required],
      school_province_code: [''],
      school_province_name: ['']
    })
  }

  private crateFormApplicantapply() {
    return this.baseFormBuilder.group({
      applicant_apply_id: [null],
      education_type_name_th: [''],
      academic_year_id: [null],
      academic_year_name: ['',],
      academic_semester_id: [null],
      academic_semester_name: [''],
      program_schedule_id: [null],
      course_schedule_id: [null],
      applicant_id: [null],
      program_id: [],
      program_code: [''],
      program_name: [''],
      payment_amount: [0],
      payment_flag: true,
      document_flag: [false],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],
      courseName: [''],
      application_status_id: [null],
      is_document_completed: [true],
      is_document_incomplete: [null],
      is_document_wrong: [null],
      is_document_update: [null],
      is_not_approve: [null],
      payment_type_code: [''],
      application_id: [null],
      apply_date: [null],
      plan_register_pay_in_no: [0],
      plan_register_payment_amount: [0],
      plan_register_payment_flag: [true],
      plan_register_id: [null],
      education_type_id: [null],
      faculty_id: [null],
      major_id: [null],
      student_code: [null],
      rsu_email: [null],
      validate_by_id: [null],
      coupon_id: [null],
      coupon_amount: [0],
      courses: this.baseFormBuilder.array([], Validators.required),
      documents: this.baseFormBuilder.array([], Validators.required),
      fees: this.baseFormBuilder.array([]),
    })
  }

  private addFormFees(fee) {
    return this.baseFormBuilder.group({
      applicant_apply_fee_id: [fee.applicant_apply_fee_id],
      applicant_apply_id: [fee.applicant_apply_id],
      fee_type_id: [fee.fee_type_id],
      amount: [fee.amount],
      status_id: [fee.status_id],
      create_by: [fee.create_by],
      create_date: [fee.create_date],
      last_update_by: [fee.last_update_by],
      last_update_date: [fee.last_update_date]
    })
  }

}
