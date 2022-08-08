import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFormId',
  pure: false
})
export class GetFormIdPipe implements PipeTransform {
  defaultUID = null
  transform(id: any, items: Array<any>, keyArray: string, key: string, msg: any, defaultMsg?: string): any{
    // console.log(id)
    // console.log(items)
    if (id == this.defaultUID && defaultMsg != undefined) {      
      return msg
    } else if (id != undefined) {
      // console.log(items != undefined)
      if(items != undefined){
        let index = items.findIndex(x => x[keyArray] == id)            
        if(index == -1){
          return msg
        } else {
          // console.log(index != -1 ? items[index][key] : msg)
          return index != -1 ? items[index][key] : msg
        }
      }      
    } else {
      return msg
    }
  }
}
