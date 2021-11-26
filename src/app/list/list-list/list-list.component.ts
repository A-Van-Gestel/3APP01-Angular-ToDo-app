import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { List } from '../list';
import { ListService } from '../list.service';
import { ItemService } from '../../item/item.service';


@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.scss']
})
export class ListListComponent implements OnInit, OnDestroy {
  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();

  errorMessage: string = '';

  private numberOfItemsInLists: Array<number> = []

  constructor(private listService: ListService, private itemService: ItemService, private router: Router) {
  }

  ngOnInit(): void {
    this.getLists();
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['list/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['list/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteList$ = this.listService.deleteList(id).subscribe(result => {
      //all went well
      this.getLists();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => {
      this.lists = result

      result.forEach(list => {
        this.itemService.getItemsFromList(list.id).subscribe(result => {
          this.numberOfItemsInLists.push(result.length)
        })
      });
    });
  }

  getNumberOfItemsInList(listId: number) {
    return this.numberOfItemsInLists[listId -1]
  }
}
