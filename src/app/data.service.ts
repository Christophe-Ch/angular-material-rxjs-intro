import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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

export abstract class BaseDataService {
  protected _data = new BehaviorSubject<Mock[]>([]);
  data = this._data.asObservable();

  abstract load(callback?: () => void): void;
  abstract add(mock: Mock): void;
  abstract remove(id: number): void;
  abstract save(mock: Mock): Subject<unknown>;
}

@Injectable()
export class DataService extends BaseDataService {
  static ENDPOINT_URL = 'https://633dfa8283f50e9ba3a9fc10.mockapi.io/Mock';

  constructor (protected httpClient: HttpClient, protected snackBar: MatSnackBar) { super(); }

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

  add(mock: Mock): void {
    this._data.next([...this._data.getValue(), mock]);
  }

  remove(id: number): void {
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

@Injectable()
export class MockDataService extends BaseDataService {
  load(callback?: (() => void) | undefined): void {
    this._data.next([
      { id: 1, name: 'First', createdAt: new Date(), status: Status.UNCHANGED },
      { id: 2, name: 'Second', createdAt: new Date(), status: Status.UNCHANGED },
    ]);

    if (callback) callback();
  }

  add(mock: Mock): void {
    this._data.next([...this._data.getValue(), { ...mock, name: `${mock.name} (mock)`}]);
  }

  remove(id: number): void {
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
    let observable = from([true]);
    let subject = new Subject();
    observable.subscribe(subject);
    return subject;
  }
  
}