import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],

  exports: [
    ItemComponent,
    ItemListComponent,
    ItemFormComponent
  ],
})
export class ItemModule { }
