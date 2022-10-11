import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum Status {
  NEW,
  UNCHANGED,
  CHANGED,
  DELETED
}

export class Mock {
  id!: number;
  name!: string;
  createdAt!: Date;
  status!: Status;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  static ENDPOINT_URL = 'https://633dfa8283f50e9ba3a9fc10.mockapi.io/Mock';

  constructor(private httpClient: HttpClient) { }

  load(): Observable<Mock[]> {
    return this.httpClient.get<Mock[]>(DataService.ENDPOINT_URL);
  }

  save(mock: Mock): Observable<Mock> | void {
    switch (mock.status) {
      case Status.NEW:
        return this.httpClient.post<Mock>(DataService.ENDPOINT_URL, mock);
      case Status.CHANGED:
        return this.httpClient.put<Mock>(`${DataService.ENDPOINT_URL}/${mock.id}`, mock);
      case Status.DELETED:
        return this.httpClient.delete<Mock>(`${DataService.ENDPOINT_URL}/${mock.id}`);
    }
  }
}
