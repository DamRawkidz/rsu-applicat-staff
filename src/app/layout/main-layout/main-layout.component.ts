import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OdicOpenService } from 'src/app/core/service/odic/odic-open.service';
import { PermissiomService } from 'src/app/core/service/permissiom.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  clickMenu : boolean = false
  isExpandMenu: boolean = true
  @Output() onToggleMenu = new EventEmitter<boolean>()
  nameUser : any
  mailUser : any
  mode = new FormControl('over');
  img : any = 'https://rsu.71dev.com/app-api/documents/5fb1b2e4-74a4-41b5-8502-9df70cc27631.png'
  role : any
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(public router:Router,
              public OdicOpenService:OdicOpenService,
              public PermissiomService:PermissiomService,
              ) { }

  ngOnInit(): void {
    console.log(this.OdicOpenService.getClaims());
    this.nameUser = this.OdicOpenService.getClaims()?.display_name
    // this.mailUser = this.OdicOpenService.getClaims()?.email

    this.PermissiomService.getAll().subscribe((x:any)=>{
      console.log(x)
      this.nameUser = x.user_display_name
      if(x.object_permissions){
        this.role =  x.object_permissions
      }else{
        this.role =  x.data_permissions
      }
      console.log(this.role)
    })
    
  }
  toggleMenu(){
    this.isExpandMenu = !this.isExpandMenu
    this.onToggleMenu.emit(this.isExpandMenu)
  }
  gotoDashboardPage(){
    this.router.navigate(['app/dashboard'])
  }
  gotoProjectSchedulePage(){
    this.router.navigate(['app/Project'])
  }
  gotoCoursePage(){
    this.router.navigate(['app/course'])
  }
  gotoemail_templatePage(){
    this.router.navigate(['app/email-template'])
  }
  gotodocument_typePage(){
    this.router.navigate(['app/document_type'])
  }
  gotoenrollPage(){
    this.router.navigate(['app/enroll'])
  }
  gotaddmissionPage(){
    this.router.navigate(['app/addmission'])
  }
  got_admission_list1(){
    this.router.navigate(['app/admission-list1'])
  }
  got_admission_list2(){
    this.router.navigate(['app/admission-list2'])
  }
  got_short_course_list(){
    this.router.navigate(['app/short-course-list'])
  }
  gotoAcademicYearPage(){
    this.router.navigate(['app/academic_years'])
  }
  gotoacademic_semestersPage(){
    this.router.navigate(['app/academic_semesters'])
  }
  gotoinquirePage(){
    this.router.navigate(['app/inquire'])
  }
  inportScorePage(){
    this.router.navigate(['app/inport-score'])
  }
  interview(){
    this.router.navigate(['app/interview'])
  }
  admission(){
    this.router.navigate(['app/admission'])
  }
  process(){
    this.router.navigate(['app/process'])
  }
  arrangeRoomPage(){
    this.router.navigate(['app/arrange-room'])
  }
  ExamResultsPage(){
    this.router.navigate(['app/check-exam-results'])
  }
  profilePage(){
    this.router.navigate(['app/profile-detail'])
  }
  installmentPage(){
    this.router.navigate(['app/installment'])
  }
  profileDelPage(){
    this.router.navigate(['app/profile_detail_del'])
  }
  profile_fac_Page(){
    this.router.navigate(['app/profile_detail_fac'])
  }
  SchoolDataPage(){
    this.router.navigate(['app/school'])
  }
  education_levelPage(){
    this.router.navigate(['app/education_level'])
  }
  program_typePage(){
    this.router.navigate(['app/program_type'])
  }
  messagePage(){
    this.router.navigate(['app/set-message'])
  }
  subjectPage(){
    this.router.navigate(['app/subject'])
  }
  couponPage(){
    this.router.navigate(['app/coupon_discount'])
  }
  import_contactPage(){
    this.router.navigate(['app/import_contact'])
  }
  display_qrcode(){
    this.router.navigate(['/display-qrcode'])
  }
  windowsSlid(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
