import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item.component';
import { SharedModule } from '../shared/shared.module';
import { ItemStatusBarComponent } from './item-status-bar/item-status-bar.component';



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
