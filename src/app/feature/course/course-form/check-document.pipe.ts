import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkDocument',
  pure: true
})
export class CheckDocumentPipe implements PipeTransform {

  transform(value: any,data:any , form:any): any {
    // console.log(value)
    // console.log(data)
    // console.log(form)
    let a  = form.documents.findIndex(x=>x.document_type_id == data.document_type_id)
    // console.log(a)
    if(a != -1){
      return true
    }else{
      return false
    }
    
  }

}
