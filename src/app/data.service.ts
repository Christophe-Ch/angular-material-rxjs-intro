import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

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

  dataSubject = new BehaviorSubject<Mock[]>([]);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  load(): Subscription {
    return this.httpClient.get<Mock[]>(DataService.ENDPOINT_URL).subscribe({
      next: (result) => this.dataSubject.next(
        result.map(entry => ({ ...entry, status: Status.UNCHANGED }))
      ),
      error: () => this.snackBar.open('An error occured while fetching data, please try again later.', '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    });
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
