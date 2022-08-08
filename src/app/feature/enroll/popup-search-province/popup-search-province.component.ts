import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProvinceService } from 'src/app/core/service/province.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'popup-search-province',
  templateUrl: './popup-search-province.component.html',
  styleUrls: ['./popup-search-province.component.scss']
})
export class PopupSearchProvinceComponent implements OnInit {
  row : any = []
  provinceData:any = []
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor( public dialogRef: MatDialogRef<PopupSearchProvinceComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private provinceSV: ProvinceService,
    ) { 
    }

  ngOnInit(): void {
    console.log(this.data)
    this.provinceSV.getAll().subscribe((x:any)=>{
      this.provinceData = [...x]
      this.provinceData = new MatTableDataSource(this.provinceData);
      this.provinceData.sort = this.sort
    })

  }
  selectData(value){
    console.log(value)
    this.data.get('applicants.school_province_code').setValue(value.province_code)
    this.data.get('applicants.school_province_name').setValue(value.province_name_th)
    this.dialogRef.close('close')
  }
}
