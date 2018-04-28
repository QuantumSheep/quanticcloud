import { Component, Input } from '@angular/core';

@Component({
  selector: 'contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.css']
})
export class ContextMenuComponent {
  @Input() x = 0;
  @Input() y = 0;

  constructor() { }
}
