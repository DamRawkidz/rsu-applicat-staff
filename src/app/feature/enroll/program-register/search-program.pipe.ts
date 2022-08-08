import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProgram'
})
export class SearchProgramPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    var menu = items.filter(it => {
      return it.display.toLowerCase().includes(searchText);
    });
    if (menu.length != 0) {
      return menu
    } 
  }

}
