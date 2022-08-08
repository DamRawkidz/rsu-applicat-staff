import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkCourse'
})
export class CheckCoursePipe implements PipeTransform {

  transform(value: any,data:any , form:any): any {
    console.log(data)
    console.log(form)
    if(data.length != 0){
      let a  = data.findIndex(x=>x.value.course_code == form.course_code) 
      if(a != -1){
        return true
      }else{
        return false
      } 
    }
    
    
  }
}
