import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkCoseProgram'
})
export class CheckCoseProgramPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
