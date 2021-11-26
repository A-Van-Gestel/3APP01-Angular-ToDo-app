import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ListFormComponent } from './list-form/list-form.component';
import { ListListComponent } from './list-list/list-list.component';
import { ListRoutingModule } from './list-routing.module';



@NgModule({
  declarations: [
    ListListComponent,
    ListFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule
  ],
  exports: [
    ListListComponent,
    ListFormComponent
  ]
})
export class ListModule { }
