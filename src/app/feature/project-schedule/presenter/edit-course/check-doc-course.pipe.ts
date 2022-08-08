import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkDocCourse'
})
export class CheckDocCoursePipe implements PipeTransform {

  transform(value: any,data:any , form:any): any {
    // console.log(value)
    // console.log(data)
    console.log(form)
    let a  = form.findIndex(x=>x.document_type_id == data.document_type_id)
    // console.log(a)
    if(a != -1){
      return true
    }else{
      return false
    }
    
  }
}
