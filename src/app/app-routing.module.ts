import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'itemlist', component: ItemListComponent },
  { path: 'newitem', component: ItemFormComponent },
  { path: 'edititem/:id', component: ItemFormComponent },
  { path: 'lists', component: ItemFormComponent },
  { path: 'newlist', component: ItemFormComponent },
  { path: 'editlist/:id', component: ItemFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
