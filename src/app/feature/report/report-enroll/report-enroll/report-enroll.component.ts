import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { tap, concatMap, timeout } from 'rxjs/operators';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApplicantService } from 'src/app/core/service/applicant.service';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { BaseForm } from 'src/app/core/base/base-form';
import { ActivatedRoute, Router } from '@angular/router';
import { realCitizenIdValidator } from 'src/app/shared/validators/real-citizen-id-validator';
import { PrefixService } from 'src/app/core/service/prefix.service';
import { DecimalPipe } from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'report-enroll',
  templateUrl: './report-enroll.component.html',
  styleUrls: ['./report-enroll.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportEnrollComponent extends BaseForm implements OnInit {
  date = new Date()
  course = []
  fees = []
  amount : any = '0.00'
  prefixs = []
  constructor(public applicantSV:ApplicantService,
              public applicantApplys:ApplicantApplysService,
              public FormBuilder:FormBuilder,
              public router:Router,
              public DecimalPipe:DecimalPipe,
              public PrefixService:PrefixService,
              public activeRoute: ActivatedRoute,
    ) {super(FormBuilder,activeRoute)
      this.PrefixService.query('standard').subscribe((x: any) => {
        this.prefixs = x
      })
    }


  ngOnInit(): void {
    console.log('aaa')
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
        payment_type_code: res.payment_type_code,
      })
      this.amount =  String(this.DecimalPipe.transform(res.payment_amount,'1.2-2'))  
      if(res.courses){
        this.course = res.courses
        console.log(this.course)
      }
      // if(res.documents){
      //   res.documents.forEach((documents) => {
      //     let itemsArray = this.form.get('applicantapply.documents') as FormArray
      //     itemsArray.push(this.editDocForm(documents))
      //   })
      // }
      if(res.fees){
       this.fees = res.fees
       console.log(this.fees)
      //  this.amount =  String(this.DecimalPipe.transform(this.fees[0].amount,'1.2-2'))  
      }
     }),
     tap(x=>{
      // window.print();
      // console.log(x)
     }), 
     concatMap((x)=>
    //  console.log(x)
     this.loadApplicant(x.applicant_id)
     ),
    
    ).
    subscribe((res: any) => {
      console.log(res)
      
      setTimeout(() => {
        window.print();
      }, 100);
      window.onafterprint = () => {
        setTimeout(() => {
          this.router.navigate(['/app/enroll'])  
        }, 10);
        
      }  
      
    })
    




    // fromEvent(window, 'onafterprint').subscribe(x=>{
    //   console.log(x)
    // })
    // setTimeout(() => {
    //   window.print()
    // }, 1000);
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
          program_type_id:res.program_type_id
        })
        
        ),
      // tap(res => this.dateChange(res.date_of_birth)),
      // tap(() => this.cdRef.detectChanges())
    )
  }

  ThaiBaht(Number){
    console.log(Number)
    //ตัดสิ่งที่ไม่ต้องการทิ้งลงโถส้วม
    for (var i = 0; i < Number.length; i++)
    {
      Number = Number.replace (",", ""); //ไม่ต้องการเครื่องหมายคอมมาร์
      Number = Number.replace (" ", ""); //ไม่ต้องการช่องว่าง
      Number = Number.replace ("บาท", ""); //ไม่ต้องการตัวหนังสือ บาท
      Number = Number.replace ("฿", ""); //ไม่ต้องการสัญลักษณ์สกุลเงินบาท
    }
    //สร้างอะเรย์เก็บค่าที่ต้องการใช้เอาไว้
    var TxtNumArr = new Array ("ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ");
    var TxtDigitArr = new Array ("", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน");
    var BahtText = "";
    //ตรวจสอบดูซะหน่อยว่าใช่ตัวเลขที่ถูกต้องหรือเปล่า ด้วย isNaN == true ถ้าเป็นข้อความ == false ถ้าเป็นตัวเลข
    if (isNaN(Number))
    {
      return "ข้อมูลนำเข้าไม่ถูกต้อง";
    } else
    {
      //ตรวสอบอีกสักครั้งว่าตัวเลขมากเกินความต้องการหรือเปล่า
      if ((Number - 0) > 9999999.9999)
      {
        return "ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้";
      } else
      {
        //พรากทศนิยม กับจำนวนเต็มออกจากกัน (บาปหรือเปล่าหนอเรา พรากคู่เขา)
        Number = Number.split (".");
        //ขั้นตอนต่อไปนี้เป็นการประมวลผลดูกันเอาเองครับ แบบว่าขี้เกียจจะจิ้มดีดแล้ว อิอิอิ
        if (Number[1].length > 0)
        {
          Number[1] = Number[1].substring(0, 2);
        }
        var NumberLen = Number[0].length - 0;
        for(var i = 0; i < NumberLen; i++)
        {
          var tmp = Number[0].substring(i, i + 1) - 0;
          if (tmp != 0)
          {
            if ((i == (NumberLen - 1)) && (tmp == 1))
            {
              BahtText += "เอ็ด";
            } else
            if ((i == (NumberLen - 2)) && (tmp == 2))
            {
              BahtText += "ยี่";
            } else
            if ((i == (NumberLen - 2)) && (tmp == 1))
            {
              BahtText += "";
            } else
            {
              BahtText += TxtNumArr[tmp];
            }
            BahtText += TxtDigitArr[NumberLen - i - 1];
          }
        }
        BahtText += "บาท";
        if ((Number[1] == "0") || (Number[1] == "00"))
        {
          BahtText += "ถ้วน";
        } else
        {
          let DecimalLen = Number[1].length - 0;
          for (var i = 0; i < DecimalLen; i++)
          {
            var tmp = Number[1].substring(i, i + 1) - 0;
            if (tmp != 0)
            {
              if ((i == (DecimalLen - 1)) && (tmp == 1))
              {
                BahtText += "เอ็ด";
              } else
              if ((i == (DecimalLen - 2)) && (tmp == 2))
              {
                BahtText += "ยี่";
              } else
              if ((i == (DecimalLen - 2)) && (tmp == 1))
              {
                BahtText += "";
              } else
              {
                BahtText += TxtNumArr[tmp];
              }
              BahtText += TxtDigitArr[DecimalLen - i - 1];
            }
          }
          BahtText += "สตางค์";
        }
        return BahtText;
      }
    }
  }



  createForm() {
    return this.baseFormBuilder.group({
      applicants: this.createFormApplicants(),
      applicantapply: this.crateFormApplicantapply()
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
      is_document_completed: [''],
      courses: this.baseFormBuilder.array([], Validators.required),
      documents: this.baseFormBuilder.array([], Validators.required),
      fees: this.baseFormBuilder.array([]),
    })
  }
}
