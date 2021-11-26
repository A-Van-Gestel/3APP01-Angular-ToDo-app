import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/list/list';
import { ListService } from 'src/app/list/list.service';
import { Item } from '../item';
import { ItemListComponent } from '../item-list/item-list.component';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-status-bar',
  templateUrl: './item-status-bar.component.html',
  styleUrls: ['./item-status-bar.component.scss']
})
export class ItemStatusBarComponent implements OnInit {
  @Input() item: Item = {
    id: 0,
    listId: 0,
    title: '',
    description: '',
    date: '',
    statusId: 0,
    order: 0
  };

  @Input() list: List = {
    id: 0,
    name: '',
    color: ''
  };

  constructor(private itemService: ItemService, private router: Router, private itemListComponent: ItemListComponent) { }

  ngOnInit(): void {
  }

  setDone(itemId: number): void {
    this.itemService.setItemDone(itemId).subscribe(result => {
      this.itemListComponent.getItems();
    }, error => {
      //error
    });
  }

  setDoing(itemId: number): void {
    this.itemService.setItemDoing(itemId).subscribe(result => {
      this.itemListComponent.getItems();
    }, error => {
      //error
    });
  }

  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe(result => {
      this.itemListComponent.getItems();
      this.itemListComponent.getLists();
    }, error => {
      //error
    });
  }

  editItem(itemId: number) {
    //TODO
    this.router.navigate(['item/edit/' + itemId]);
  }

  orderIncrease(itemId: number): void {
    this.itemService.orderIncrease(itemId).subscribe(result => {
      this.itemListComponent.getItems();
    }, error => {
      //error
    });
  }

  orderDecrease(itemId: number): void {
    this.itemService.orderDecrease(itemId).subscribe(result => {
      this.itemListComponent.getItems();
    }, error => {
      //error
    });
  }

}
