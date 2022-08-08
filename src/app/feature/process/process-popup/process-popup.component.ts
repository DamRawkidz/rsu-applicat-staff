import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'process-popup',
  templateUrl: './process-popup.component.html',
  styleUrls: ['./process-popup.component.scss']
})
export class ProcessPopupComponent implements OnInit {
  rows : any = []
  name = []
  constructor(
    public dialogRef: MatDialogRef<ProcessPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.rows = this.data
  }
  closeDialog() {
    this.dialogRef.close([])
  }
  changAppil(value,data){
    if(value){
      let i = this.name.findIndex(x=>x.applicant_apply_id == data.applicant_apply_id)
      if(i == -1){
        this.name.push(data)
      }
    }else{
      let i = this.name.findIndex(x=>x.applicant_apply_id == data.applicant_apply_id)
      this.name.splice(i,1)
    }
    console.log(this.name);
  }
  add(){
    this.dialogRef.close(this.name)
  }
}
