import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ItemFormRoutingModule } from './item-form-routing.module';



@NgModule({
  declarations: [
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ItemFormRoutingModule
  ],
  exports: [
    ItemFormComponent
  ],
})
export class ItemFormModule { }
