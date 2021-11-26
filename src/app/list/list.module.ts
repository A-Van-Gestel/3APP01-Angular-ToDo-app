import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListListComponent } from './list-list/list-list.component';
import { ListFormComponent } from './list-form/list-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListListComponent,
    ListFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListListComponent,
    ListFormComponent
  ]
})
export class ListModule { }
