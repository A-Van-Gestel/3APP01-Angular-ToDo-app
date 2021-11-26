import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({
  name: 'dateAndTime'
})
export class DateAndTimePipe implements PipeTransform {

  transform(date: Date, showTime: boolean): string {
    if(showTime) {
      var formattedDate = formatDate(date,'dd/MM/yyyy HH:mm', "en-US", 'UTC+00:00');
    }
    else {
      var formattedDate = formatDate(date,'dd/MM/yyyy', "en-US", 'UTC+00:00');
    }
    return formattedDate;
  }
}
