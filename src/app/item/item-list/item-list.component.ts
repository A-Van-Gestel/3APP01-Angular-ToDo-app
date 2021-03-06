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
    });
  }

  addItem() {
    //Navigate to form in add mode
    this.router.navigate(['item/new']);
  }

  getNumberOfItemsInList(listId: number) {
    let numberOfItemsInLists = 0
    this.items.forEach(item => {
      if (item.listId == listId) {
        numberOfItemsInLists += 1;
      }
    })
    return numberOfItemsInLists;
  }

  getNumberOfItemsDoneInList(listId: number) {
    let numberOfItemsDoneInLists = 0
    this.items.forEach(item => {
      if (item.listId == listId && item.statusId == 2) {
        numberOfItemsDoneInLists += 1;
      }
    })
    return numberOfItemsDoneInLists;
  }
}
