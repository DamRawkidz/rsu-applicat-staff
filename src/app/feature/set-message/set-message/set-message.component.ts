import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'set-message',
  templateUrl: './set-message.component.html',
  styleUrls: ['./set-message.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
