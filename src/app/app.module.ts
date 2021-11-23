import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './item/item.component';
import { DateAndTimePipe } from './date-and-time.pipe';
import { ItemListComponent } from './item-list/item-list.component';
import { TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form/item-form.component';
import { ListListComponent } from './list-list/list-list.component';
import { ListFormComponent } from './list-form/list-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ItemComponent,
    DateAndTimePipe,
    ItemListComponent,
    ItemFormComponent,
    ListListComponent,
    ListFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
