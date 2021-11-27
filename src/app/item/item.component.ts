import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusEnum } from '../status/status-enum';
import { Item } from './item';
import { ItemService } from './item.service';

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

  private timeTillDeadline: number = 0;

  private status: Subscription = new Subscription();

  constructor(private itemService: ItemService, private titleCasePipe:TitleCasePipe) { }

  ngOnInit(): void {
    this.getStatusName();
    this.getDateTime();
    this._getTimeTillDeadline()
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

  private _getTimeTillDeadline() {
    // Get current date
    let date = new Date();
    let currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)); // TimeZone differences: https://stackoverflow.com/a/37661393

    // https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    // Calculate the time difference of two dates
    this.timeTillDeadline = this.dateTime.getTime() - currentDate.getTime();
  }

  private _floorNumber(number: number, showSign: boolean): number {
    if(showSign) {
      return Math.sign(number) * Math.floor(Math.abs(number)); // Math.Sign is used to fix negative number flooring
    }
    else {
      return Math.floor(Math.abs(number));
    }
  }

  getDaysTillDeadline_raw(): number {
    // Calculate the no. of days between two dates
    return this.timeTillDeadline / 86400000;  // 1000 * 3600 * 24
  }

  getDaysTillDeadline(showSign: boolean = false): number {
    // Calculate the no. of days between two dates
    let time = this.timeTillDeadline / 86400000;  // 1000 * 3600 * 24
    return this._floorNumber(time, showSign);
  }

  getHoursTillDeadline(showSign: boolean = false): number {
    // Calculate the no. of days between two dates
    let time = this.timeTillDeadline % 86400000 / 3600000;
    return this._floorNumber(time, showSign);
  }

  getMinutesTillDeadline(showSign: boolean = false): number {
    // Calculate the no. of days between two dates
    let time = this.timeTillDeadline % 86400000 % 3600000 / 60000;
    return this._floorNumber(time, showSign);
  }
}
