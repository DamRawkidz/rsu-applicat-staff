import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelButtonComponent implements OnInit {
  @Input() name: string = 'ยกเลิก'
  @Input() color: string = 'accent'
  @Input() disabled: boolean = null
  
  constructor() { }

  ngOnInit(): void {
  }

}
