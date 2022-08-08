import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkDocProgram'
})
export class CheckDocProgramPipe implements PipeTransform {

  transform(value: any,data:any , form:any): any {
    let a  = form.documents.findIndex(x=>x.document_type_id == data.document_type_id)
    if(a != -1){
      return true
    }else{
      return false
    }
    
  }

}
