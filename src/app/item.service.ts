import { Injectable } from '@angular/core';
import { Item } from './item';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StatusEnum } from './status-enum';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Item[]>("http://localhost:3000/items")));
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:3000/items/" + id);
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>('http://localhost:3000/items/' + id);
  }

  putItem(id: number, item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Item>("http://localhost:3000/items/" + id, item, {headers: headers});
  }

  setItemDone(id: number): Observable<Item> {
    return this.getItemById(id).pipe(
            switchMap(item => {
              item.statusId = StatusEnum.DONE;
              return this.putItem(id, item);
            })
    );
  }

  setItemDoing(id: number): Observable<Item> {
    return this.getItemById(id).pipe(
            switchMap(item => {
              item.statusId = StatusEnum.ONGOING;
              return this.putItem(id, item);
            })
    );
  }
}
