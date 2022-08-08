import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { tap, filter, map, switchMap, debounceTime, concatMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { BaseForm } from 'src/app/core/base/base-form';
import { Education, EducationService, Fees } from 'src/app/core/service/education.service';
import { Course, ProgramsService } from 'src/app/core/service/programs.service';
import { District } from 'src/app/core/service/districts.service';
import { School, SchoolService } from 'src/app/core/service/school.service';
import { Country, CountryService } from 'src/app/core/service/country.service';
import { FormArray, Validators, FormBuilder } from '@angular/forms';
import { UploadService } from 'src/app/core/service/upload.service';
import { ApplicantService } from 'src/app/core/service/applicant.service';
import * as moment from 'moment';
import { of, throwError, fromEvent } from 'rxjs';
import { realCitizenIdValidator } from 'src/app/shared/validators/real-citizen-id-validator';
import { PrefixService } from 'src/app/core/service/prefix.service';
import { AddressService, Address } from 'src/app/core/service/addresses.service';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import swal from 'sweetalert2'
import { ProvinceService } from 'src/app/core/service/province.service';
import { EducationLevelsService } from 'src/app/core/service/education-levels.service';
import { ProgramTypesService } from 'src/app/core/service/program-types.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends BaseForm implements OnInit, AfterViewInit {
  @Output() selectProgram = new EventEmitter()
  @ViewChild('courseInput', { static: true }) courseInput: ElementRef<HTMLInputElement>
  @ViewChild('file') upload: ElementRef<HTMLInputElement>
  educations = []
  program = []
  provinces = []
  provincesData = []
  educationsForm: Education[] = []
  documents = []
  a = new Date()
  courses: Course[] = []
  @Input() districts: District[]
  address: any[] = []
  startDate: Date = new Date()
  prefixs = []
  school: School[] = []
  country: Country[] = []
  searchEnrollArray = []
  educationsData = []
  price: number = 0
  entollPrice = 0
  payment: number
  maximum_apply_course: number = 0
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
  public get provinceCode() : string {
    return this.form.get('applicants.school_province_code').value
  }
  @ViewChild('age') age: ElementRef<HTMLInputElement>
  educationLevels = []
  programsType = []
  constructor(
    private router: Router,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    private ProgramsService: ProgramsService,
    private uploadSV: UploadService,
    private PrefixService: PrefixService,
    private AddressService: AddressService,
    private dialog: MatDialog,
    private applicantSV: ApplicantService,
    private applicantApplys: ApplicantApplysService,
    private schoolSV: SchoolService,
    private countrySV: CountryService,
    private cdRef: ChangeDetectorRef,
    private DocumentTypesService: DocumentTypesService,
    private provinceSV: ProvinceService,
    private EducationService: EducationService,
    private EducationLevelsService: EducationLevelsService,
    private ProgramTypesService: ProgramTypesService,
    
  ) {
    super(FormBuilder, activeRoute)
    this.startDate = moment().subtract(18, 'years').toDate()
    this.ProgramsService.getSearch(1, 'open').subscribe((x: any) => {
      this.program = x
    })
    this.PrefixService.query('standard').subscribe((x: any) => {
      this.prefixs = x
    })
    this.EducationService.getAll().subscribe((x: any) => {
      this.educationsData = x
      console.log(this.educationsData)
    })
    this.provinceSV.getAll().subscribe((x: any) => {
      this.provincesData = x
      console.log(this.provincesData)
    })
    this.EducationLevelsService.getAll().subscribe((x:any)=>{
      this.educationLevels = x
    })
    this.ProgramTypesService.getAll().subscribe((x:any)=>{
      this.programsType = x
    })
  }


  private loadApplicant(applicant_id: number){
    return this.applicantSV.getDate(applicant_id).pipe(
      tap((res:any) => 
        
        this.form.get('applicants').patchValue({
          applicant_id:res.applicant_id,
          sign_in_channel_id:res.sign_in_channel_id,
          user_id:res.user_id,
          title_id:res.title_id,
          prefix_code:res.prefix_code,
          gender_id:res.gender_id,
          first_name_th:res.first_name_th,
          last_name_th:res.last_name_th,
          first_name_en:res.first_name_en,
          middle_name_en:res.middle_name_en,
          last_name_en:res.last_name_en,
          date_of_birth:res.date_of_birth,
          email:res.email,
          mobile:res.mobile,
          province_name:res.province_name,
          district_name:res.district_name,
          sub_district_name:res.sub_district_name,
          address1:res.address1,
          address2:res.address2,
          education_level_id:res.education_level_id,
          graduate_year:res.graduate_year,
          major:res.major,
          gpa:res.gpa,
          status_id:res.status_id,
          create_by:res.create_by,
          create_date:res.create_date,
          last_update_by:res.last_update_by,
          last_update_date:res.last_update_date,
          sub_district_code:res.sub_district_code,
          postal_code:res.postal_code,
          road:res.road,
          soi:res.soi,
          school_code:res.school_code,
          school_name:res.school_name,
          moo:res.moo,
          foreign_school_flag:res.foreign_school_flag,
          school_country_code:res.school_country_code,
          personal_id:res.personal_id,
          school_province_code:res.school_province_code,
          program_type_id:res.program_type_id,
        })
        
        ),
      tap(res => this.dateChange(res.date_of_birth)),
      tap(() => this.cdRef.detectChanges())
    )
  }
  ngOnInit(): void {

    console.log(this.id)
    this.applicantApplys.getDate(this.id).pipe(
      tap(x=>console.log(x)),
     tap((res:any)=>{
      this.form.get('applicantapply').patchValue({
        applicant_apply_id: res.applicant_apply_id,
        education_type_name_th: res.education_type_name_th,
        academic_year_id: res.academic_year_id,
        academic_year_name: res.academic_year_name,
        academic_year_name_th: res.academic_year_name_th,
        academic_semester_id: res.academic_semester_id,
        academic_semester_name: res.academic_semester_name,
        academic_semester_name_th: res.academic_semester_name_th,
        program_schedule_id: res.program_schedule_id,
        course_schedule_id: res.course_schedule_id,
        applicant_id: res.applicant_id,
        application_id: res.application_id,
        program_id: res.program_id,
        program_name: res.program_name,
        program_name_th: res.program_name_th,
        payment_amount: res.payment_amount,
        payment_flag: res.payment_flag,
        document_flag: res.document_flag,
        is_document_completed: res.is_document_completed,
        payment_type_code: res.payment_type_code,
        create_by: res.create_by,
        create_date: res.create_date,
        last_update_by: res.last_update_by,
        last_update_date: res.last_update_date,
        courseName: res.courseName,
        application_status_id: res.application_status_id,
        application_status_name_th: res.application_status_name_th,
        course_code: res.course_code,
      })
      if(res.courses){
        res.courses.forEach((courses) => {
          let itemsArray = this.form.get('applicantapply.courses') as FormArray
          itemsArray.push(this.EditFormArray(courses))
        })
      }
      if(res.documents){
        res.documents.forEach((documents) => {
          let itemsArray = this.form.get('applicantapply.documents') as FormArray
          itemsArray.push(this.editDocForm(documents))
        })
      }
      if(res.fees){
        res.fees.forEach((fees) => {
          let itemsArray = this.form.get('applicantapply.fees') as FormArray
          itemsArray.push(this.addFormFees(fees))
          this.entollPrice += fees.amount
        })
      }
     }),
     concatMap((x)=>
    //  console.log(x)
     this.loadApplicant(x.applicant_id)
     )
    ).
    subscribe((res: any) => {
      console.log(res)
    })

    this.form.get('applicantapply.application_id').disable()
    this.form.get('applicantapply.program_name_th').disable()
    this.form.get('applicantapply.education_type_name_th').disable()
    this.form.get('applicantapply.academic_year_name_th').disable()
    this.form.get('applicantapply.program_id').disable()
    this.form.get('applicantapply.academic_semester_name_th').disable()
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
      tap(result => console.log('get doccuemnt from', result)),
      tap((result: DocumentType[]) => this.documents = [...result]),
      // tap((result: DocumentType[]) => result.map(result => this.getFormDocuments.push(this.editDocForm(result)))),
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
      // filter((text:string) => text.length >= 3),
      switchMap(text => this.schoolSV.query(`?school_name_th=${text}`)),
      tap((school: School[]) => this.school = [...school]),
      tap((school: School[]) => this.cdRef.detectChanges()),
      // takeUntil(this.unSubAll$)
    ).subscribe()

    this.form.get('applicants.school_country_name').valueChanges.pipe(
      debounceTime(500),
      // filter((text:string) => text.length >= 3),
      switchMap(text => this.countrySV.query(`?country_name_th=${text}`)),
      tap((country: Country[]) => this.country = [...country]),
      tap((country: Country[]) => this.cdRef.detectChanges()),
      // takeUntil(this.unSubAll$)
    ).subscribe()

    this.form.get('applicants.school_province_name').valueChanges.pipe(
      debounceTime(500),
      tap(x => console.log(x)),
      switchMap(text => this.provinceSV.query(`?province_name_th=${text}`)),
      tap(x => console.log(x)),
      tap((result: any) => this.provinces = [...result]),
      tap(() => this.cdRef.detectChanges()),
      tap(x => console.log(x)),
      // takeUntil(this.unSubAll$),
      catchError(err => {
        return of([])
      })
    ).subscribe(
      () => {},
      (err) => {
        alert('err')
      }
    )

  }
  closePage() {
    this.router.navigate(['app/profile-detail'])
  }
  onChangeForeignSchoolFlag(){
    this.form.get('applicants.foreign_school_flag').valueChanges.pipe(
      tap(chcked => {
        if (chcked) {
            this.form.get('applicants').patchValue({
              school_province_name: '',
              school_province_code: '',
              school_name:'',
              school_code:''
            })
            this.school = [...[]]
        } else {

        }
      }),
      // takeUntil(this.unSubAll$),
    ).subscribe()
  }
  selectProvincSchool(provinc){
    this.form.get('applicants.school_province_code').setValue(provinc.province_code)
  }
  selectSchool(school: School) {
    this.isSelectSchool = true
    this.form.get('applicants.school_code').setValue(school.school_code)
  }
  selectCountry(coutnry: Country) {
    this.form.get('applicants.school_country_code').setValue(coutnry.country_code)
  }
  selectAddress(event, address: any) {
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

    this.ProgramsService.getDate(data.program_id).pipe(
      map((x: any) => x.applyPrices.map(x => x.price).reduce((a, c) => a + c, 0)),
      tap(x => { this.entollPrice = x })

    ).subscribe()

  }

  selectCourse(course) {
    if (this.maximum_apply_course === this.getFormCoures.length) {
      swal.fire({
        icon: 'warning',
        text: `คุณสามารถเลือกหลักสูตรได้เพียง ${this.maximum_apply_course} หลักสูตรในโครงการนี้`
      })
      return
    }
    console.log(course)
    // this.store.dispatch(UPDATE_FACULTY_NAME({facultyName: course.name_th}))
    this.form.get('applicantapply.courseName').setValue('')
    this.getFormCoures.push(this.createFormArray(course))

  }
  paymentPopup() {
    const dialogRef = this.dialog.open(PaymentPopupComponent, {
      width: '90vw',
      height: '90vh ',
      data: this.form.get('applicantapply').value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  removeCoures(index) {
    this.getFormCoures.removeAt(index)
  }
  search() {
    console.log('search')
    console.log(this.courseInput.nativeElement.value)
    let programeId = this.form.get('applicantapply.program_id').value
    console.log(programeId)
    this.EducationService.query<EducationService[]>(`${programeId}?name_th=`).pipe(
      tap((result: EducationService[]) => this.educations = [...result]),
      // tap(result => console.log(result)),
      tap(() => this.cdRef.detectChanges()),
    ).subscribe()
  }
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
        // tap(result => result.map(fee => this.formfees.push(this.addFormFees(fee)))
        // )
        )
    } else {
      return of([])
    }
  }
  onSubmit() {
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
    // if (!this.form.get('applicantapply.courses').valid) {
    //   this.form.get('applicantapply.courses').markAllAsTouched()
    //   swal.fire({
    //     icon: 'warning',
    //     text: 'กรุณาเลือกคอร์ส'
    //   })
    //   return
    // }
    this.applicantSV.update(this.form.getRawValue().applicant_id,this.form.getRawValue().applicants).pipe(
      // concatMap(result => this.applicantSV.add(this.form.getRawValue().applicants)),
      tap(result => console.log(result)),
      concatMap(result => {
        let request = this.form.getRawValue().applicantapply
        // request.applicant_id = result.applicant_id
        console.log(request)
        return this.applicantApplys.update(request.applicant_apply_id,request).pipe(
          tap(x => console.log(x)),
          // tap((x: any) => this.applicantApplys.applicant_apply_id = x.applicant_apply_id),
          // tap((x: any) => this.applicantApplys.payin_no = x.application_id),
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
      // this.gotootpPage()
      // this.applicantApplys.idChange$.next(res.applicant_apply_id)
    })
  }
  searchEnroll(input) {
    console.log(input)
    this.applicantApplys.query(`?${'personal_id'}=${input}`).subscribe((x: any) => {
      console.log(x)
      this.searchEnrollArray = x
    })
  }
  clickSearch(value) {
    console.log(value)
    this.gotootpPage()
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
      this.gotootpPage()
      this.applicantApplys.idChange$.next(res.applicant_apply_id)
    })
  }
  selectFile(index: number) {
    this.uploadFileIndex = index
    this.upload.nativeElement.click()
  }
  repoer(){
    this.router.navigate(['report-enroll/edit',this.form.get('applicantapply.applicant_apply_id').value])  
  }
  ngAfterViewInit(): void {
    // fromEvent(this.courseInput.nativeElement, 'input').pipe(
    //   map((event: any) => event.target.value),
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   switchMap(text => {
    //     let programeId = this.form.get('applicantapply.program_id').value
    //     return this.EducationService.query<EducationService[]>(`${programeId}?name_th=${text}`)
    //   }),
    //   tap((result: EducationService[]) => this.educations = [...result]),
    //   // tap(result => console.log(result)),
    //   tap(() => this.cdRef.detectChanges()),
    //   // takeUntil(this.unsubAll$)      
    // ).subscribe()


  }

  gotootpPage() {
    this.router.navigate(['app/enroll/otp'])
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
      course_code: [coures.course_code],
      major_code: [coures.major_code],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null]
    })
  }
  EditFormArray(coures) {
    return this.baseFormBuilder.group({
      applicant_apply_course_id:[coures.applicant_apply_course_id],
      applicant_apply_id:[coures.applicant_apply_id],
      row_order:[coures.row_order],
      course_id:[coures.course_id],
      program_course_id:[coures.program_course_id],
      status_id:[coures.status_id],
      create_by:[coures.create_by],
      course_code: [coures.course_code],
      major_code: [coures.major_code],
      create_date:[coures.create_date],
      last_update_by:[coures.last_update_by],
      last_update_date:[coures.last_update_date],
      course_name_th:[coures.course_name_th],
      course_name_en:[coures.course_name_en],
      major_name_th:[coures.major_name_th],
      major_name_en:[coures.major_name_en],
      faculty_name_th:[coures.faculty_name_th],
      faculty_name_en:[coures.faculty_name_en]
    })
  }
  editDocForm(doc: any) {
    return this.baseFormBuilder.group({
      applicant_apply_document_id: doc.applicant_apply_document_id,
      applicant_apply_id: doc.applicant_apply_id,
      document_type_id: doc.document_type_id,
      document_type_name: doc.document_type_name,
      document_name: doc.document_name,
      document_url: doc.document_url,
      status_id: doc.status_id,
      create_by: doc.create_by,
      create_date: doc.create_date,
      last_update_by: doc.last_update_by,
      last_update_date: doc.last_update_date
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
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.email]],
      mobile: ['', Validators.required],
      country_id: [null],
      country_name: [''],
      province_name: [{ value: '', disabled: true }],
      district_name: [{ value: '', disabled: true }, Validators.required],
      sub_district_name: ['', Validators.required],
      address1: [''],
      address2: [''],
      zipcode: [''],
      education_level_id: [null],
      education_level_name: [''],
      graduate_year: ['', Validators.required],
      graduate_from_id: [null],
      graduate_from_name: [''],
      major: [''],
      gpa: ['', Validators.required],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],
      sub_district_code: ['', Validators.required],
      postal_code: [{ value: '', disabled: true }],
      road: [''],
      soi: [''],
      school_code: ['', Validators.required],
      school_name: ['', Validators.required],
      moo: [''],
      prefix_code: ['', Validators.required],
      personal_id: ['', [Validators.required, realCitizenIdValidator]],
      foreign_school_flag: [false],
      school_country_code: ['', Validators.required],
      school_country_name: [''],
      school_province_code: [''],
      school_province_name: [''],
      program_type_id: [null],
    })
  }

  private crateFormApplicantapply() {
    return this.baseFormBuilder.group({
      applicant_apply_id: [null],
      education_type_name_th: [''],
      academic_year_id: [null],
      academic_year_name: ['',],
      academic_year_name_th: ['',],
      academic_semester_id: [null],
      academic_semester_name: [''],
      academic_semester_name_th: [''],
      program_schedule_id: [null],
      course_schedule_id: [null],
      applicant_id: [null],
      application_id: [null],
      program_id: [null],
      program_name: [''],
      program_name_th: [''],
      payment_amount: [0],
      payment_flag: [true],
      document_flag: [false],
      is_document_completed: [false],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],
      courseName: [''],
      application_status_id: [''],
      application_status_name_th: [''],
      payment_type_code: [''],
      course_code: [''],
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
