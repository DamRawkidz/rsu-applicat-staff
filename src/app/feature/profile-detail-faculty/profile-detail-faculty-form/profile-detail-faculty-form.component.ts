import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { of, throwError } from 'rxjs';
import { tap, concatMap, filter, map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { BaseForm } from 'src/app/core/base/base-form';
import { Address, AddressService } from 'src/app/core/service/addresses.service';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { ApplicantService } from 'src/app/core/service/applicant.service';
import { Country, CountryService } from 'src/app/core/service/country.service';
import { District } from 'src/app/core/service/districts.service';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { EducationLevelsService } from 'src/app/core/service/education-levels.service';
import { Education, EducationService, Fees } from 'src/app/core/service/education.service';
import { PrefixService } from 'src/app/core/service/prefix.service';
import { ProgramTypesService } from 'src/app/core/service/program-types.service';
import { Course, ProgramsService } from 'src/app/core/service/programs.service';
import { ProvinceService } from 'src/app/core/service/province.service';
import { School, SchoolService } from 'src/app/core/service/school.service';
import { UploadService } from 'src/app/core/service/upload.service';
import { PreviewDocComponent } from 'src/app/shared/components/preview-doc/preview-doc.component';
import { realCitizenIdValidator } from 'src/app/shared/validators/real-citizen-id-validator';
import { PaymentPopupComponent } from '../../enroll/payment-popup/payment-popup.component';
import swal from 'sweetalert2'

@Component({
  selector: 'profile-detail-faculty-form',
  templateUrl: './profile-detail-faculty-form.component.html',
  styleUrls: ['./profile-detail-faculty-form.component.scss']
})
export class ProfileDetailFacultyFormComponent extends BaseForm implements OnInit {
  @Output() selectProgram = new EventEmitter()
  @ViewChild('courseInput', { static: true }) courseInput: ElementRef<HTMLInputElement>
  @ViewChild('file') upload: ElementRef<HTMLInputElement>
  educations = []
  program = []
  educationsForm: Education[] = []
  documents = []
  courses: Course[] = []
  provincesData = []
  a = new Date()
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
  isStatusApplicate = 0
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
  @ViewChild('age') age: ElementRef<HTMLInputElement>
  educationLevels =[]
  programsType=[]
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
      console.log(x)
      this.prefixs = x
    })
    this.EducationService.getAll().subscribe((x: any) => {
      this.educationsData = x
      console.log(this.educationsData)
    })
    this.provinceSV.getAllGemeral().subscribe((x: any) => {
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
      tap(x=>console.log(x)),
      tap((res:any) => 
        
        this.form.get('applicants').patchValue({
          applicant_id:res.applicant_id,
          sign_in_channel_id:res.sign_in_channel_id,
          user_id:res.user_id,
          title_id:res.title_id,
          prefix_code:res.prefix_code,
          prefix_name_th:res.prefix_name_th,
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
          apply_date: res.apply_date,
          plan_register_pay_in_no: res.plan_register_pay_in_no,
          plan_register_payment_amount: res.plan_register_payment_amount,
          plan_register_payment_flag: res.plan_register_payment_flag,
          faculty_id: res.faculty_id,
          major_id: res.major_id,
          plan_register_id: res.plan_register_id,
          student_code: res.student_code,
          rsu_email: res.rsu_email,
          education_type_id: res.education_type_id,
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
        academic_year_name_th: res.academic_year_name_th,
        academic_semester_id: res.academic_semester_id,
        application_id: res.application_id,
        academic_semester_name_th: res.academic_semester_name_th,
        program_schedule_id: res.program_schedule_id,
        course_schedule_id: res.course_schedule_id,
        applicant_id: res.applicant_id,
        program_id: res.program_id,
        payin_id: res.payin_id,
        payin_no: res.payin_no,
        program_name_th: res.program_name_th,
        payment_amount: res.payment_amount,
        payment_flag: res.payment_flag,
        document_flag: res.document_flag,
        create_by: res.create_by,
        create_date: res.create_date,
        last_update_by: res.last_update_by,
        last_update_date: res.last_update_date,
        courseName: res.courseName,
        course_code: res.course_code,
        application_status_id: res.application_status_id,
        application_status_name_th: res.application_status_name_th,
        is_document_completed: res.is_document_completed,
        is_document_incomplete: res.is_document_incomplete,
        is_document_wrong: res.is_document_wrong,
        is_document_update: res.is_document_update,
        is_not_approve: res.is_not_approve,
        validate_by_id: res.validate_by_id,
        payment_type_code: res.payment_type_code,
        coupon_id: res.coupon_id,
        coupon_amount: res.coupon_amount,
      })
        this.isStatusApplicate = res.application_status_id
      if(res.courses){
        res.courses.forEach((courses) => {
          let itemsArray = this.form.get('applicantapply.courses') as FormArray
          itemsArray.push(this.EditFormArray(courses))
        })
      }
      if(res.documents){
        this.documents = [...res.documents]
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
      
     
     
     
     
     

     


      // this.progressBar.complete()
      // this.loading =  false
    })
    this.form.get('applicantapply.application_id').disable()
    this.form.get('applicantapply.program_name_th').disable()
    this.form.get('applicantapply.education_type_name_th').disable()
    this.form.get('applicantapply.academic_year_name_th').disable()
    this.form.get('applicantapply.program_id').disable()
    this.form.get('applicantapply.academic_semester_name_th').disable()
    this.form.get('applicantapply.application_status_name_th').disable()
    // this.form.get('applicantapply').disable()
    // this.form.get('applicants').disable()
    // this.form.get('applicantapply.program_id').disable()
    // this.form.get('applicantapply.academic_semester_name_th').disable()
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
      // tap(() => this.documents = [...[]]),      
      // tap(() => this.getFormDocuments.clear()),
      // tap((result: DocumentType[]) => {
      //   this.documents = [...result]
      //   let newDoc = this.documents.filter((x,index,self:[]) => {
      //         return self.findIndex((s:any) => s.document_type_id == x.document_type_id) == index
      //   })

      //   this.documents = [...newDoc]
      // }),
      // tap((result: DocumentType[]) => this.documents.map(result => this.getFormDocuments.push(this.creatDocForm(result)))),
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
      switchMap(text => this.schoolSV.queryGemeral(`?school_name_th=${text}`)),
      tap((school: School[]) => this.school = [...school]),
      tap((school: School[]) => this.cdRef.detectChanges()),
      // takeUntil(this.unSubAll$)
    ).subscribe()

    this.form.get('applicants.school_country_name').valueChanges.pipe(
      debounceTime(500),
      // filter((text:string) => text.length >= 3),
      switchMap(text => this.countrySV.queryGemeral(`?country_name_th=${text}`)),
      tap((country: Country[]) => this.country = [...country]),
      tap((country: Country[]) => this.cdRef.detectChanges()),
      // takeUntil(this.unSubAll$)
    ).subscribe()

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
    const dialogRef = this.dialog.open(PreviewDocComponent,{
      width: '50vw',
      height: '50vh',
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
  repoer(){
    this.router.navigate(['report-enroll/edit',this.form.get('applicantapply.applicant_apply_id').value])  
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
    this.form.get('applicantapply.academic_year_name_th').setValue(data.academic_year_code)
    this.form.get('applicantapply.academic_semester_id').setValue(data.academic_semester_id)
    this.form.get('applicantapply.academic_semester_name_th').setValue(data.academic_semester_name_th)
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
  checkDocmentPass(value){
    console.log(value)
    if(value){
      this.form.get('applicantapply.is_not_approve').setValue(false)
      this.form.get('applicantapply.is_document_incomplete').setValue(false)
      this.form.get('applicantapply.is_document_wrong').setValue(false)
      this.form.get('applicantapply.is_document_completed').setValue(true)
      this.form.get('applicantapply.validate_by_id').setValue(2)
    }
  }
  changeWrongDoc(value){
    if(value){
      this.form.get('applicantapply.is_document_completed').setValue(false)
      this.form.get('applicantapply.is_not_approve').setValue(false)
      this.form.get('applicantapply.is_document_incomplete').setValue(false)
      this.form.get('applicantapply.is_document_wrong').setValue(true)
      this.form.get('applicantapply.validate_by_id').setValue(2)
    }
  }
  changeNotPass(value){
    if(value){
      this.form.get('applicantapply.is_document_incomplete').setValue(false)
      this.form.get('applicantapply.is_document_wrong').setValue(false)
      this.form.get('applicantapply.is_document_completed').setValue(false)
      this.form.get('applicantapply.is_not_approve').setValue(true)
      this.form.get('applicantapply.validate_by_id').setValue(2)
    }
  }
  changewaitDoc(value){
    if(value){
      this.form.get('applicantapply.is_document_wrong').setValue(false)
      this.form.get('applicantapply.is_document_completed').setValue(false)
      this.form.get('applicantapply.is_not_approve').setValue(false)
      this.form.get('applicantapply.is_document_incomplete').setValue(true)
      this.form.get('applicantapply.validate_by_id').setValue(2)
    }
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
  addPage() {
    this.router.navigate(['app/profile_detail_fac'])
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
        tap(result => result.map(fee => this.formfees.push(this.addFormFees(fee)))
        ))
    } else {
      return of([])
    }
  }
  onSubmit() {
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
      file_name: doc.file_name,
      document_url: doc.document_url,
      progress: doc.progress,
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
      district_name: [{ value: '', disabled: true }],
      sub_district_name: [''],
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
      program_type_id: [null],
      sub_district_code: ['', Validators.required],
      postal_code: [{ value: '', disabled: true }],
      road: [''],
      soi: [''],
      school_code: ['', Validators.required],
      school_name: ['', Validators.required],
      moo: [''],
      prefix_code: ['', Validators.required],
      prefix_name_th: ['', Validators.required],
      personal_id: ['', [Validators.required, realCitizenIdValidator]],
      foreign_school_flag: [false],
      school_country_code: ['', Validators.required],
      school_country_name: [''],
      school_province_code: [''],
      school_province_name: ['']
    })
  }

  private crateFormApplicantapply() {
    return this.baseFormBuilder.group({
      applicant_apply_id: [null],
      education_type_name_th: [''],
      academic_year_id: [null],
      application_id: [null],
      academic_year_name_th: ['',],
      academic_semester_id: [null],
      academic_semester_name_th: [''],
      program_schedule_id: [null],
      course_schedule_id: [null],
      applicant_id: [null],
      payin_id: [null],
      payin_no: [null],
      program_id: [null],
      program_name_th: [''],
      payment_amount: [0],
      payment_flag: [true],
      document_flag: [false],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],
      courseName: [''],
      application_status_id: [''],
      application_status_name_th: [''],
      course_code: [''],
      payment_type_code: [''],
      is_document_completed: [true],
      is_document_incomplete: [true],
      is_document_wrong: [true],
      is_document_update: [true],
      is_not_approve: [true],
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

