import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormComponent } from './list-form/list-form.component';
import { ListListComponent } from './list-list/list-list.component';

const routes: Routes = [
  { path: '', component: ListListComponent },
  { path: 'form', component: ListFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
