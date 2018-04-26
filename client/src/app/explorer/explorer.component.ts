import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: [
    './explorer.component.css',
    '../app.component.css'
  ]
})

export class ExplorerComponent implements OnInit {

  constructor(private _router: Router) {
    console.log(_router.url);
  }

  ngOnInit() {
  }

}
