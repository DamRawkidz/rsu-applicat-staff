import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmButtonComponent implements OnInit {
  @Input() name: string = 'เพิ่ม'
  @Input() color: string = 'accent'
  @Input() disabled: boolean = null
  
  constructor() { }

  ngOnInit(): void {
  }

}
