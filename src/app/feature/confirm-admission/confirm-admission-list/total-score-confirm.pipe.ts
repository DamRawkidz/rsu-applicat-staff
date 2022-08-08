import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalScoreConfirm'
})
export class TotalScoreConfirmPipe implements PipeTransform {

  transform(score: any, subArray: any[]): any {
    console.log(subArray)
    let total = 0
    subArray.forEach(x=>{
      total += x.score
    })
    return total;
  }

}
