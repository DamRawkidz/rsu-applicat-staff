import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BuildingService } from 'src/app/core/service/building.service';

@Component({
  selector: 'popup-exam-setting',
  templateUrl: './popup-exam-setting.component.html',
  styleUrls: ['./popup-exam-setting.component.scss']
})
export class PopupExamSettingComponent implements OnInit {
  rows : any = []
  roomsData = []
  buildingData = []
  constructor(
    public dialogRef: MatDialogRef<PopupExamSettingComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialog: MatDialog,
    public BuildingService:BuildingService,
  ) { 
    this.BuildingService.getAll().subscribe((x: any) => {
      console.log(x)
      this.buildingData = x
    })
  }

  ngOnInit(): void {
  }
  getRooms(floorCode) {
    console.log(floorCode)
    let a = encodeURIComponent(floorCode)
    console.log(a)
    this.BuildingService.getRooms(a).subscribe((x: any) => {
      console.log(x)
      this.roomsData = x
    })
  }
}
