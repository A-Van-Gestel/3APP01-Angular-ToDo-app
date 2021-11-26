import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { List } from '../../list/list';
import { ListService } from '../../list/list.service';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  lists: List[] = [];
  items$: Subscription = new Subscription();
  lists$: Subscription = new Subscription();

  private numberOfItemsInLists: Map<number, number> = new Map<number, number>()
  private numberOfItemsDoneInLists: Map<number, number> = new Map<number, number>()

  constructor(private itemService: ItemService, private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.getItems();
    this.getLists();
  }

  getItems() {
    this.items$ = this.itemService.getItems().subscribe(result => this.items = result);
  }

  getItemsSortedByDate() {
    this.items$ = this.itemService.getItemsSortedByDate().subscribe(result => this.items = result);
  }

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => {
      this.lists = result

      result.forEach(list => {
        this.itemService.getItemsFromList(list.id).subscribe(result => {
          this.numberOfItemsInLists.set(list.id, result.length)
        })

        this.itemService.getItemsDoneFromList(list.id).subscribe(result => {
          this.numberOfItemsDoneInLists.set(list.id, result.length)
        })
      });
    });
  }

  addItem() {
    //Navigate to form in add mode
    this.router.navigate(['item/new']);
  }

  getNumberOfItemsInList(listId: number) {
    // Nullish Coalescing added to prevent: error 'TS2532: Object is possibly 'undefined'
    return this.numberOfItemsInLists.get(listId) ?? 0;
  }

  getNumberOfItemsDoneInList(listId: number) {
    // Nullish Coalescing added to prevent: error 'TS2532: Object is possibly 'undefined'
    return this.numberOfItemsDoneInLists.get(listId) ?? 0;
  }
}
