import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showTable'
})
export class ShowTablePipe implements PipeTransform {

  transform(value: any[], mainMenu:string , subMenu?:string):boolean {        
    if(subMenu == undefined){            
      let index = value.findIndex(menu => menu.object_code == mainMenu)      
      return index != -1 ? true : false
    }
  }

}
