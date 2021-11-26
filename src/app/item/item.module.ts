import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ItemComponent,
    ItemListComponent
  ],
})
export class ItemModule { }
