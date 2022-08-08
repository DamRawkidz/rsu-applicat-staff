import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LogInComponent } from './layout/log-in/log-in.component';
import { MenuLeftLayoutComponent } from './layout/menu-left-layout/menu-left-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { importType } from '@angular/compiler/src/output/output_ast';

const routes: Routes = [
    {
      path:'load',
      // canActivate:[AuthGuard],
      // redirectTo:'/load',
      component:LogInComponent,
      // pathMatch:'full'
    },
    {
      path:'recipe',
      loadChildren:() => import('./feature/recipe/recipe.module')
          .then(res => res.RecipeModule)
    },
    {
      path:'paymentQrCode',
      loadChildren:() => import('./feature/payment-qr-code/payment-qr-code.module')
          .then(res => res.PaymentQrCodeModule)
    },
    {
      path:'display-qrcode',
      loadChildren: () => import('./feature/qrcode-socket/qrcode-socket.module')
        .then(m => m.QrcodeSocketModule)
    },
    {
      path:'',
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      loadChildren: () => import('./feature/report/report-enroll/report-enroll.module')
      .then(m => m.ReportEnrollModule),
      // component:LogInComponent,
      pathMatch:'full'
    },
  //   {
  //     path:'load',
  //     canActivate:[AuthGuard],
  //   canActivateChild:[AuthGuard],
  //     loadChildren: () => import('./feature/authen/authen.module')
  //       .then(m => m.AuthenModule)
  // },
  {
    path: "report-enroll",
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    loadChildren: () => import('./feature/report/report-enroll/report-enroll.module')
    .then(m => m.ReportEnrollModule),
  },
  {
    path: "qrcode-payment",
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    loadChildren: () => import('./feature/qrcode-payment/qrcode-payment.module')
    .then(m => m.QrcodePaymentModule),
  },
  {
    path: "report-register",
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    loadChildren: () => import('./feature/report/report-register/report-register.module')
    .then(m => m.ReportRegisterModule),
  },
  {
    path: "report-receipt",
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    loadChildren: () => import('./feature/report/receipt-report/receipt-report.module')
    .then(m => m.ReceiptReportModule),
  },
    {
      path:'app',
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      component:MenuLeftLayoutComponent,
      children:[
        {
          path:'',
          redirectTo:'dashboard',
          pathMatch:'full'
        },
        {
          path:'application-data',
          loadChildren: () => import('./feature/security/application-data/application-data.module')
            .then( m => m.ApplicationDataModule),
            data: {
              role: 'ALL'
            }
        },
        {
          path:'application-object',
          loadChildren: () => import('./feature/security/application-object/application-object.module')
            .then( m => m.ApplicationObjectModule),
            data: {
              role: 'ALL'
            }
        },
        {
          path:'application-permission',
          loadChildren: () => import('./feature/security/application-permission/application-permission.module')
            .then( m => m.ApplicationPermissionModule),
            data: {
              role: 'ALL'
            }
        },
        {
          path:'application-role',
          loadChildren: () => import('./feature/security/application-role/application-role.module')
            .then( m => m.ApplicationRoleModule),
            data: {
              role: 'ALL'
            }
        },
        {
          path:'application-user',
          loadChildren: () => import('./feature/security/application-user/application-user.module')
            .then( m => m.ApplicationUserModule),
            data: {
              role: ['SUPER-ADMIN','ALL']
            }
        },
        // {
        //   path:'login',
        //   loadChildren: () => import('./feature/authen/authen.module')
        //     .then(x => x.AuthenModule)
        // },
        {
          path:'Project',
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/project-schedule/project-schedule.module')
            .then(x => x.ProjectScheduleModule),
            data: {
              role: 'แนะแนว'
            }
        },
        {
          path:'inquire',
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/inquire/inquire.module')
            .then(x => x.InquireModule)
        },
        {
          path:'inport-score', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/inport-score/inport-score.module')
            .then(x => x.InportScoreModule)
        },
        {
          path:'arrange-room', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/arrange-room/arrange-room.module')
            .then(x => x.ArrangeRoomModule)
        },
        {
          path:'check-exam-results', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/check-exam-results/check-exam-results.module')
            .then(x => x.CheckExamResultsModule)
        },
        {
          path:'profile-detail', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/profile-detail/profile-detail.module')
            .then(x => x.ProfileDetailModule)
        },
        {
          path:'set-message', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/set-message/set-message.module')
            .then(x => x.SetMessageModule)
        },
        {
          path:'subject', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/subject/subject.module')
            .then(x => x.SubjectModule)
        },
        {
          path:'course', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/course/course.module')
            .then(x => x.CourseModule)
        },
        {
          path:'email-template', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/emial-template/emial-template.module')
            .then(x => x.EmialTemplateModule)
        },
        {
          path:'dashboard', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/dashboard/dashboard.module')
            .then(x => x.DashboardModule)
        },
        {
          path:'document_type', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/document-type/document-type.module')
            .then(x => x.DocumentTypeModule)
        },
        {
          path:'enroll', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/enroll/enroll.module')
            .then(x => x.EnrollModule)
        },
        {
          path:'installment', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/profile-installment/profile-installment.module')
            .then(x => x.ProfileInstallmentModule)
        },
        {
          path:'academic_years', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/academic-years/academic-years.module')
            .then(x => x.AcademicYearsModule)
        },
        {
          path:'academic_semesters', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/academic-semesters/academic-semesters.module')
            .then(x => x.AcademicSemestersModule)
        },
        {
          path:'school', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/school-data/school-data.module')
            .then(x => x.SchoolDataModule)
        },
        {
          path:'education_level', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/education-level/education-level.module')
            .then(x => x.EducationLevelModule)
        },
        {
          path:'program_type', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/program-type/program-type.module')
            .then(x => x.ProgramTypeModule)
        },
        {
          path:'profile_detail_fac', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/profile-detail-faculty/profile-detail-faculty.module')
            .then(x => x.ProfileDetailFacultyModule)
        },
        {
          path:'profile_detail_del', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/delete-profile-detail/delete-profile-detail.module')
            .then(x => x.DeleteProfileDetailModule)
        },
        {
          path:'interview', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/interview/interview.module')
            .then(x => x.InterviewModule)
        },
        {
          path:'admission', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/confirm-admission/confirm-admission.module')
            .then(x => x.ConfirmAdmissionModule)
        },
        {
          path:'process', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/process/process.module')
            .then(x => x.ProcessModule)
        },
        {
          path:'coupon_discount', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/coupon-discount/coupon-discount.module')
            .then(x => x.CouponDiscountModule)
        },
        {
          path:'import_contact', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/import-contact/import-contact.module')
            .then(x => x.ImportContactModule)
        },

        // report
        {
          path:'report_exam_room', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-exam-room/report-exam-room.module')
            .then(x => x.ReportExamRoomModule)
        },
        // {
        //   path:'report_separated_course', 
        //   canActivate:[AuthGuard],
        //   canActivateChild:[AuthGuard],
        //   loadChildren: () => import('./feature/report/report-separated-course/report-separated-course.module')
        //     .then(x => x.ReportSeparatedCourseModule)
        // },
        {
          path:'report_student_admissions', // โครงการรับสมัครนักศึกษา
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-student-admissions/report-student-admissions.module')
            .then(x => x.ReportStudentAdmissionsModule)
        },
        {
          path:'report_student_list_examroom',  // รายงานผังห้องสอบ
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/student-list-exam-room/student-list-exam-room.module')
            .then(x => x.StudentListExamRoomModule)
        },
        {
          path:'report_student_total_apply_online', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/student-total-apply-online/student-total-apply-online.module')
            .then(x => x.StudentTotalApplyOnlineModule)
        },
        {
          path:'report_eligible_interview', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-list-eligible-applicants-interview/report-list-eligible-applicants-interview.module')
            .then(x => x.ReportListEligibleApplicantsInterviewModule)
        },
        
        {
          path:'report_summary_each_school', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-summary-admission-each-school/report-summary-admission-each-school.module')
            .then(x => x.ReportSummaryAdmissionEachSchoolModule)
        },
        {
          path:'report_summary_province_school', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-list-applicants-school-province/report-list-applicants-school-province.module')
            .then(x => x.ReportListApplicantsSchoolProvinceModule)
        },
        {
          path:'report_summary_applicants_faculty', //รายงานสรุปจำนวนผู้สมัครแยกตามวิทยาลัย/คณะ (แสดงเฉพาะอันดับหนึ่งเท่านั้น)
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-summary-applicants-faculty-college/report-summary-applicants-faculty-college.module')
            .then(x => x.ReportSummaryApplicantsFacultyCollegeModule)
        },
        {
          path:'report_applicants_address', //รายงานรายชื่อผู้สมัครพร้อมที่อยู่
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-list-applicants-address/report-list-applicants-address.module')
            .then(x => x.ReportListApplicantsAddressModule)
        },
        {
          path:'report_separated_course', //รายงานรายชื่อผู้สมัครแยกตามสาขาวิชา(อันดับหนึ่งเท่านั้น)
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-separated-course/report-separated-course.module')
            .then(x => x.ReportSeparatedCourseModule)
        },
        {
          path:'report_student_inexamroom', //รายชื่อผู้เข้าห้องสอบ
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/report/report-student-income-summary/report-student-income-summary.module')
            .then(x => x.ReportStudentIncomeSummaryModule)
        },
        {
          path:'addmission', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/admission-graduate-school/addmission/addmission.module')
            .then(x => x.AddmissionModule)
        },
        {
          path:'admission-list1', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/cyberU/admission-list1/admission-list1.module')
            .then(x => x.AdmissionList1Module)
        },
        {
          path:'admission-list2', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/cyberU/admission-list2/admission-list2.module')
            .then(x => x.AdmissionList2Module)
        },
        {
          path:'short-course-list', 
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          loadChildren: () => import('./feature/cyberU/short-course-list/short-course-list.module')
            .then(x => x.ShortCourseListModule)
        },
       
        
      ]
    },
    {
      path:'**',
      redirectTo:'sing-in'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
