import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { List } from '../list';
import { ListService } from '../list.service';

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

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => this.lists = result);
  }

  setDone(itemId: number): void {
    this.itemService.setItemDone(itemId).subscribe(result => {
      this.getItems();
    }, error => {
      //error
    });
  }

  setDoing(itemId: number): void {
    this.itemService.setItemDoing(itemId).subscribe(result => {
      this.getItems();
    }, error => {
      //error
    });
  }

  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe(result => {
      this.getItems();
    }, error => {
      //error
    });
  }

  addItem() {
    //Navigate to form in add mode
    this.router.navigate(['newitem']);
  }

  editItem(itemId: number) {
    //TODO
    this.router.navigate(['edititem/' + itemId]);
  }
}
