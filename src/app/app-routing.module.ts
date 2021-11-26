import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'newitem', component: ItemFormComponent },
  { path: 'edititem/:id', component: ItemFormComponent },
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
