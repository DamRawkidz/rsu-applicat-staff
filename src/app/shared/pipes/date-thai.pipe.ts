import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateThai'
})
export class DateThaiPipe implements PipeTransform {

  transform(ad): any {
    var date = new Date(ad)
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var be: any = new Date(year + 543, month, day);
    // console.log(be)
    if (be == 'Invalid Date') {
      return ''
    } else {
      return be;
    }

  }

}
