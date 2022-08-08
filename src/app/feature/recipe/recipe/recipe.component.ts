import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  currentDate
  currentTime = new Date()
  sum: number = 0
  imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkQAAAA8CAYAAACHDqXfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAcNJREFUeJzt1klupEAAAMHC//8zc2oJoSqgbWk4ZMTJLZbabHdu+77vg9ds2zbGGGPf97Ft2/gcx/Hn473H+z7Pfhzvn92zeuY4h/PY53msPt+9dzbGbz+frz2d12yP78ZcjbF679P9PV5/uo+zsb494/O457Hvfg9XezQ7k7s9e/K+2ZpXa7s7m/O12d78r/39dh/++jd0tUdP5rt65+y8V+NcncWTM7567m5td2f87Xtn63/yP+pqvb6K3/fz9gQAAN4miACAPEEEAOQJIgAgTxABAHmCCADIE0QAQJ4gAgDyBBEAkCeIAIA8QQQA5AkiACBPEAEAeYIIAMgTRABAniACAPIEEQCQJ4gAgDxBBADkCSIAIE8QAQB5gggAyBNEAECeIAIA8gQRAJAniACAPEEEAOQJIgAgTxABAHmCCADIE0QAQJ4gAgDyBBEAkCeIAIA8QQQA5AkiACBPEAEAeYIIAMgTRABAniACAPIEEQCQJ4gAgDxBBADkCSIAIE8QAQB5gggAyBNEAECeIAIA8gQRAJAniACAPEEEAOQJIgAgTxABAHmCCADIE0QAQJ4gAgDyBBEAkCeIAIA8QQQA5P0DF2FCg5PlytMAAAAASUVORK5CYII='
  qrcode = '|0994000241241026204702966229000162712200'
  last_payment_date
  subjects = [
    {
      "education_plan_subject_id": 1039,
      "education_plan_id": 4277,
      "subject_year_id": 15111,
      "lab_study_subject_section_id": 34651,
      "lab_section": "14",
      "subject_code": "CHM132",
      "year_subject_name_th": "ปฏิบัติการเคมีทั่วไป",
      "year_subject_name_en": "GENERAL CHEMISTRY LABORATORY",
      "credit": 1,
      "lecture_credit_amount": 2200,
      "total_lab_amount": 3000,
      "total_lecture_amount": 2200,
      "total_amount": 5200
  },
  {
      "education_plan_subject_id": 2906,
      "education_plan_id": 4277,
      "subject_year_id": 203630,
      "lecture_study_subject_section_id": 66556,
      "lecture_section": "01",
      "subject_code": "ENL125",
      "year_subject_name_th": "ภาษาอังกฤษเพื่อทัศนาโลก",
      "year_subject_name_en": "ENGLISH FOR GLOBAL EXPLORATION ",
      "credit": 3,
      "lecture_credit_amount": 1400,
      "total_lab_amount": 0,
      "total_lecture_amount": 4200,
      "total_amount": 4200
  },
  {
      "education_plan_subject_id": 1409,
      "education_plan_id": 4277,
      "subject_year_id": 16786,
      "lecture_study_subject_section_id": 87958,
      "lecture_section": "02",
      "subject_code": "CHM130",
      "year_subject_name_th": "เคมีพื้นฐาน",
      "year_subject_name_en": "FUNDAMENTAL CHEMISTRY",
      "credit": 3,
      "lecture_credit_amount": 2200,
      "total_lab_amount": 0,
      "total_lecture_amount": 6600,
      "total_amount": 6600
  },
  {
      "education_plan_subject_id": 5242,
      "education_plan_id": 4277,
      "subject_year_id": 90957,
      "lecture_study_subject_section_id": 64652,
      "lab_study_subject_section_id": 64657,
      "lecture_section": "03",
      "lab_section": "13",
      "subject_code": "PHY132",
      "year_subject_name_th": "ฟิสิกส์ทั่วไป : กลศาสตร์ ความร้อนและของเหลว",
      "year_subject_name_en": "GENERAL PHYSICS : MECHANICS, HEAT AND FLUID",
      "credit": 3,
      "lecture_credit_amount": 2200,
      "total_lab_amount": 3000,
      "total_lecture_amount": 6600,
      "total_amount": 9600
  },
  {
      "education_plan_subject_id": 5626,
      "education_plan_id": 4277,
      "subject_year_id": 203816,
      "lecture_study_subject_section_id": 112380,
      "lecture_section": "04",
      "subject_code": "RSU160",
      "year_subject_name_th": "รู้เท่าทันสื่อดิจิทัล",
      "year_subject_name_en": "DIGITAL MEDIA LITERACY",
      "credit": 3,
      "lecture_credit_amount": 1400,
      "total_lab_amount": 0,
      "total_lecture_amount": 4200,
      "total_amount": 4200
  }
  ]
  constructor() {
    this.currentDate = new Date()
   }

  ngOnInit(): void {
    this.subjects.forEach(x =>  this.sum += x.total_amount)
  }

}
