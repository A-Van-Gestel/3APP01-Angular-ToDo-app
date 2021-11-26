import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ListFormComponent } from './list/list-form/list-form.component';
import { ListListComponent } from './list/list-list/list-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'itemlist', component: ItemListComponent },
  { path: 'newitem', component: ItemFormComponent },
  { path: 'edititem/:id', component: ItemFormComponent },
  { path: 'lists', component: ItemFormComponent },
  { path: 'list', component: ListListComponent },
  { path: 'list/form', component: ListFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
