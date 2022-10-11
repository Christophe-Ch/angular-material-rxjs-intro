import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, NEVER, noop, Subject, Subscription } from 'rxjs';

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

  private _data = new BehaviorSubject<Mock[]>([]);
  data = this._data.asObservable();

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  load(callback?: () => void): void {
    this.httpClient.get<Mock[]>(DataService.ENDPOINT_URL).subscribe({
      next: (result) => {
        this._data.next(
          result.map(entry => ({ ...entry, status: Status.UNCHANGED }))
        );

        if (callback) callback();
      },
      error: () => this.onError()
    });
  }

  add(mock: Mock) {
    this._data.next([...this._data.getValue(), mock]);
  }

  remove(id: number) {
    this._data.next(
      this._data.getValue().map(entry => {
        if (entry.id === id) {
          entry.status = Status.DELETED;
        }

        return entry;
      }
    ));
  }

  save(mock: Mock): Subject<unknown> {
    let subject = new Subject();
    let observable;
    
    switch (mock.status) {
      case Status.NEW:
        observable = this.httpClient.post<Mock>(DataService.ENDPOINT_URL, mock);
        break;
      case Status.CHANGED:
        observable = this.httpClient.put<Mock>(`${DataService.ENDPOINT_URL}/${mock.id}`, mock);
        break;
      case Status.DELETED:
        observable = this.httpClient.delete<Mock>(`${DataService.ENDPOINT_URL}/${mock.id}`);
        break;
    }

    subject.subscribe({
      error: () => this.onError()
    });
    observable?.subscribe(subject);

    return subject;
  }

  private onError() {
    this.snackBar.open('An error occured, please try again later.', '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    })
  }
}
