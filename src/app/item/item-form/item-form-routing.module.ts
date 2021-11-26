import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFormComponent } from './item-form.component';

const routes: Routes = [
  { path: 'new', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemFormRoutingModule { }
