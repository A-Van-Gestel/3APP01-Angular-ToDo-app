import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StatusEnum } from '../status/status-enum';
import { Item } from './item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    // return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Item[]>("http://localhost:3000/items?_sort=order,date&_order=asc")));
    return this.httpClient.get<Item[]>("http://localhost:3000/items?_sort=order,date&_order=asc");
  }

  getItemsSortedByDate(): Observable<Item[]> {
    // return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Item[]>("http://localhost:3000/items?_sort=date,order&_order=asc")));
    return this.httpClient.get<Item[]>("http://localhost:3000/items?_sort=date,order&_order=asc");
  }

  getItemsFromList(listId: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items?listId=" + listId);
  }

  getItemsDoneFromList(listId: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items?listId=" + listId + "&statusId=2");
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:3000/items/" + id);
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>('http://localhost:3000/items/' + id);
  }

  postItem(item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Item>("http://localhost:3000/items", item, {headers: headers});
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

  orderIncrease(id: number): Observable<Item> {
    return this.getItemById(id).pipe(
            switchMap(item => {
              item.order += 1;
              return this.putItem(id, item);
            })
    );
  }

  orderDecrease(id: number): Observable<Item> {
    return this.getItemById(id).pipe(
            switchMap(item => {
              item.order -= 1;
              return this.putItem(id, item);
            })
    );
  }
}
