import { Injectable } from '@angular/core';
import { List } from './list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../item/item';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private itemsToDelete: Item[] = [];

  constructor(private httpClient: HttpClient, private itemService: ItemService) {
  }

  getLists(): Observable<List[]> {
    // return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<List[]>("http://localhost:3000/lists")));
    return this.httpClient.get<List[]>("http://localhost:3000/lists");
  }

  getListById(id: number): Observable<List> {
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id);
  }

  deleteList(id: number): Observable<List> {
    // First delete the Items in this list
    this.itemService.getItemsFromList(id).subscribe(result => this.itemsToDelete = result);

    this.itemsToDelete.forEach(item => {
      this.itemService.deleteItem(item.id).subscribe()
    });

    // Then delete the actual list
    return this.httpClient.delete<List>('http://localhost:3000/lists/' + id);
  }

  postList(list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<List>("http://localhost:3000/lists", list, {headers: headers});
}

  putList(id: number, list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<List>("http://localhost:3000/lists/" + id, list, {headers: headers});
  }

}
