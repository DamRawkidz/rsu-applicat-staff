import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusCourse'
})
export class StatusCoursePipe implements PipeTransform {

  transform(code: any, apply:[]): any {
    let i = apply.findIndex((x:any)=>x.course_code ==code)
    if(i != -1){
      return 'ผ่าน'
    }else{
      return 'ไม่ผ่าน';
    }
    
  }

}
