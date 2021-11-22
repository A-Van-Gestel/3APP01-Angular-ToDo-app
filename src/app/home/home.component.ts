import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  lists: List[] = [];
  items$: Subscription = new Subscription();
  lists$: Subscription = new Subscription();

  constructor(private itemService: ItemService, private listService: ListService) { }

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
}
