import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalScore'
})
export class TotalScorePipe implements PipeTransform {

  transform(score: any, subArray: any[]): any {
    let total = 0
    subArray.forEach(x=>{
      total += x.score
    })
    return total;
  }

}
