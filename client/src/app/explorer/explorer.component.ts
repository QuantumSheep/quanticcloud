import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExplorerService } from './explorer.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: [
    './explorer.component.css',
    '../../assets/grid.css'
  ]
})

export class ExplorerComponent implements OnInit {
  files: Object;
  path: string;

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  constructor(private _router: Router, private explorerService: ExplorerService, private location: Location) {
    location.subscribe(val => {
      this.updatePathAndFiles();
    });

    this.updatePathAndFiles();
  }

  ngOnInit() {

  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();

    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
  }

  disableContextMenu() {
    this.contextmenu = false;
  }

  updatePathAndFiles() {
    this.path = window.location.pathname.replace(/(^\/explorer)/gi, '');
    this.setFilesList(this.path);
  }

  enterFile(path) {
    this.setFilesList(path);

    this.path = path;
    window.history.pushState(null, document.title, `/explorer${this.path}`);
  }

  setFilesList(path: string) {
    return this.explorerService.getFiles(path).subscribe(data => {
      this.files = data;
    });
  }

}
