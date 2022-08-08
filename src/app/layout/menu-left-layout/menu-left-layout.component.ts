import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'menu-left-layout',
  templateUrl: './menu-left-layout.component.html',
  styleUrls: ['./menu-left-layout.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuLeftLayoutComponent implements OnInit {
  isExpandMenu: boolean = true
  constructor() { }

  ngOnInit(): void {
  }

}
