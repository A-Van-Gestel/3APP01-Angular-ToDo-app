import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Status } from '../status';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = {
    id: 0,
    listId: 0,
    title: '',
    description: '',
    date: new Date(0),
    statusId: 0,
    order: 0
  };

  statusName: string = "";
  private status: Subscription = new Subscription();

  constructor(private statusService: StatusService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getStatusName();
  }

  getStatusName() {
    this.status = this.statusService.getStatusById(this.item.statusId).subscribe(result => this.statusName = result.name);
  }


  setDone(itemId: number): void {
    this.itemService.setItemDone(itemId).subscribe(result => {
      this.ngOnInit();
    }, error => {
      //error
    });
  }

  setDoing(itemId: number): void {
    this.itemService.setItemDoing(itemId).subscribe(result => {
      this.ngOnInit();
    }, error => {
      //error
    });
  }
}
