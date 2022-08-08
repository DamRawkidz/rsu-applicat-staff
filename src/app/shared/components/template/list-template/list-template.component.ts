import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTemplateComponent implements OnInit {
  @Output()
  onClickConfirmButton = new EventEmitter<void>()
  
  @Input() title: string = ''
  @Input() confirmNameButton: string = ''
  @Input() showButton: boolean = true
  constructor() { }

  ngOnInit(): void {
  }

}
