import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item', loadChildren: () => import('./item/item-form/item-form.module').then(m => m.ItemFormModule) },
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
