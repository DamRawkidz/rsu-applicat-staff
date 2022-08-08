import { ViewChild, Directive } from '@angular/core';

import { MatSort } from '@angular/material/sort';

import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment.prod';
import { MatTableDataSource } from '@angular/material/table';

@Directive()
export class BaseList {
    isProduction = environment.production
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    constructor() {
        
    }

    protected updateMatTable(res: any){
        res = new MatTableDataSource(res)
        res.paginator = this.paginator
        res.sort = this.sort        
        return res
    
    }
}