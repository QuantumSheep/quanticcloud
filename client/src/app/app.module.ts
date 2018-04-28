import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { HomeComponent } from './home/home.component';
import { FilestreeComponent } from './filestree/filestree.component';

import { ExplorerService } from './explorer/explorer.service';
import { ContextMenuComponent } from './contextmenu/contextmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    FilestreeComponent,
    ExplorerComponent,
    HomeComponent,
    ContextMenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ExplorerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
