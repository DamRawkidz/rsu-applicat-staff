import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchInputAuto'
})
export class SearchInputAutoPipe implements PipeTransform {

  transform(items: any[], searchText: string, name:string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    var menu = items.filter(it => {
      return it[name].toLowerCase().includes(searchText);
    });
    if (menu.length != 0) {
      return menu
    } 
  }

}
