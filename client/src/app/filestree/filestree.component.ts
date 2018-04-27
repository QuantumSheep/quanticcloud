import { Component, OnInit, Input } from '@angular/core';
import { ExplorerComponent } from '../explorer/explorer.component';
import { ExplorerService } from '../explorer/explorer.service';

@Component({
  selector: 'filestree',
  template: `
      <ul class="tree">
          <li *ngFor="let file of tree; index as i;">
              <input type="checkbox" id="c{{ filei + i }}" />
              <label for="c{{ filei + i }}" class="tree_label">{{ file.name }}</label>
              <filestree [filei]="filei + 10" [rec]="1" [tree]="file.childs" *ngIf="file.childs != null"></filestree>
          </li>
      </ul> 
  `,
  styleUrls: ['./filestree.component.css']
})
export class FilestreeComponent {
  @Input() tree;
  @Input() rec;
  @Input() filei = 0;

  constructor(private explorerService: ExplorerService) {

  }

  ngOnInit() {
    if (this.rec == null) {
      this.updateTree();
    }
  }

  updateTree() {
    return this.explorerService.getFiles('/').subscribe(data => {
      this.tree = data;
    });
  }

}
