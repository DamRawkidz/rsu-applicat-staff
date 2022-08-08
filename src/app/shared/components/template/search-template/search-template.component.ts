import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTemplateComponent implements OnInit {
  @Output()
  onClickConfirmButton = new EventEmitter<void>()

  @Output()
  onClickCancleButton = new EventEmitter<void>()

  @Input() confirmNameButton: string = 'ค้นหา'
  @Input() cancleNameButton: string = 'ยกเลิก'
  @Input() alignLayoutButton = 'end'

  constructor() { }

  ngOnInit(): void {
  }

}
