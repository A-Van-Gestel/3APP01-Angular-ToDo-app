import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ItemFormRoutingModule } from './item-form-routing.module';
import { ItemFormComponent } from './item-form.component';



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
