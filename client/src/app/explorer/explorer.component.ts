import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExplorerService } from './explorer.service';

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

  constructor(private _router: Router, private explorerService: ExplorerService) {
    this.path = window.location.pathname.replace(/(^\/explorer)/gi, '');
    this.setFilesList(this.path);
  }

  ngOnInit() {
    
  }

  enterFile(path) {
    this.setFilesList(path);

    this.path = path;
    window.history.pushState(null, document.title, `/explorer${this.path}`);
  }

  setFilesList(path: string) {
    console.log(path);
    return this.explorerService.getFiles(path).subscribe(data => {
      this.files = data;
    });
  }

}
