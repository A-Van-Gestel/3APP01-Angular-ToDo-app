import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { StatusEnum } from '../status-enum';

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
    date: '',
    statusId: 0,
    order: 0
  };

  // Status Name property
  statusName: string = "";

  // DateTime property
  dateTime: Date = new Date();


  private status: Subscription = new Subscription();

  constructor(private itemService: ItemService, private titleCasePipe:TitleCasePipe) { }

  ngOnInit(): void {
    this.getStatusName();
    this.getDateTime();
  }

  getStatusName() {
    this.statusName = this.titleCasePipe.transform(StatusEnum[this.item.statusId]);
  }

  getDateTime() {
    this.dateTime = new Date(this.item.date);
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
