import { Injectable } from '@angular/core';
import { Status } from './status';

import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) {
  }

  getStatuses(): Observable<Status[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Status[]>("http://localhost:3000/statuses")));
  }

  getStatusById(id: number): Observable<Status> {
    return this.httpClient.get<Status>("http://localhost:3000/statuses/" + id);
  }

}
