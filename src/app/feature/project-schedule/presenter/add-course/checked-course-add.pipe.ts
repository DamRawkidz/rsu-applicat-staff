import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkedCourseAdd',
  pure:false
})
export class CheckedCourseAddPipe implements PipeTransform {

  transform(value: any,data:any , form:any): any {
    // console.log(value)
    // console.log(data)
    // console.log(form)
    if(form != undefined){
      let a  = form.findIndex(x=>x.course_code == data.course_code)
      // console.log(a)
      if(a != -1){
        return true
      }else{
        return false
      }
    }
    
  }

}
