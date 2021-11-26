import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { SharedModule } from './shared/shared.module';
import { ItemModule } from './item/item.module';
import { ListModule } from './list/list.module';
import { StatusModule } from './status/status.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ItemModule,
    ListModule,
    StatusModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
