import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showMenuRole'
})
export class ShowMenuRolePipe implements PipeTransform {

  transform(value: any[], mainMenu:string , subMenu?:string):boolean {        
    if(subMenu == undefined){            
      let index = value?.findIndex(menu => menu.object_code == mainMenu || menu.object_code === 'ALL' )      
      return index != -1 ? true : false
    }
  }

}
