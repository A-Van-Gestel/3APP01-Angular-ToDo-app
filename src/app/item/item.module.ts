import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemStatusBarComponent } from './item-list/item-status-bar/item-status-bar.component';
import { ItemComponent } from './item.component';



@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemStatusBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ItemComponent,
    ItemListComponent,
    ItemStatusBarComponent
  ],
})
export class ItemModule { }
