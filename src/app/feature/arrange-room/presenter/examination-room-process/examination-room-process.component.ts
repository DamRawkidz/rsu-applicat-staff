import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'examination-room-process',
  templateUrl: './examination-room-process.component.html',
  styleUrls: ['./examination-room-process.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExaminationRoomProcessComponent implements OnInit {
  show = 0
  constructor() { }

  ngOnInit(): void {
  }

}
