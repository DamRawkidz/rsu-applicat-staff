import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doubleCheckItem'
})
export class DoubleCheckItemPipe implements PipeTransform {

  transform(id: any,items: Array<any>,  keyArray: string) {
    // console.log(items)
    if (items != undefined || items != null) {
      let index = items.findIndex(x => x[keyArray] == id)
      // console.log(index)
      if (index != -1) {

        return true
        // let index2 = items.find(x => x[keyArray] == '00000000-0000-0000-0000-000000000000')
        // if (index2 == undefined) {
        //   return ''
        // } else {
        //   return 'disabled-all';
        // }
      } else {
        return false;
      }
    }
  }

}
