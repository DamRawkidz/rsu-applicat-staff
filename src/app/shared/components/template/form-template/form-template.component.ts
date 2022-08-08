import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
