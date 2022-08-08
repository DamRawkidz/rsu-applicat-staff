import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SchoolService, School } from 'src/app/core/service/school.service';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { BaseForm } from 'src/app/core/base/base-form';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup-search-school',
  templateUrl: './popup-search-school.component.html',
  styleUrls: ['./popup-search-school.component.scss']
})
export class PopupSearchSchoolComponent extends BaseForm implements OnInit {
  row : any = []
  schoolData:any = []
  public get provinceCode() : string {
    return this.data.get('applicants.school_name').value
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor( public dialogRef: MatDialogRef<PopupSearchSchoolComponent>,
    private dialog: MatDialog,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private schoolSV: SchoolService,
    
    ) { super(FormBuilder,activeRoute)

      
    }

  ngOnInit(): void {

    this.schoolSV.query(`?province_code=${this.data.get('applicants.school_province_code').value}`).subscribe((x:any)=>{
      this.schoolData = [...x]
      this.schoolData = new MatTableDataSource(this.schoolData);
      this.schoolData.sort = this.sort
    })

    this.data.get('applicants.school_name').valueChanges.pipe(
      debounceTime(500),
      filter((text:string) => !this.data.get('applicants.foreign_school_flag').value),
      switchMap(text => this.schoolSV.query(`?school_name_th=${text}&province_code=${this.data.get('applicants.school_province_code').value}`)),
      tap( (school:School[]) => this.schoolData = [...school]),
      // tap( (school:School[]) => this.cdRef.detectChanges()),
      // takeUntil(this.unSubAll$)
    ).subscribe()

  }
  selectData(value){
    console.log(value)
    this.data.get('applicants.school_code').setValue(value.school_code)
    this.data.get('applicants.school_name').setValue(value.school_name_th)
    this.dialogRef.close('close')
  }

}
