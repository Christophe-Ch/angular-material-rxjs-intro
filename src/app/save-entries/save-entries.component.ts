import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DataService, Mock, Status } from '../data.service';

@Component({
  selector: 'app-save-entries',
  templateUrl: './save-entries.component.html',
  styleUrls: ['./save-entries.component.css']
})
export class SaveEntriesComponent {
  data: Mock[] = [];
  logs: string[] = [];

  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
    this.dataService.dataSubject.subscribe({
      next: (data) => this.data = data
    })
  }

  save() {
    this.data.forEach(entry => {
      if (entry.status === Status.UNCHANGED) return;

      (<Observable<Mock>>this.dataService.save(entry)).subscribe({
        next: () => {
          switch (entry.status) {
            case Status.NEW:
              this.logs = [...this.logs, `✨ ${entry.name} added!`];
              break;
            case Status.CHANGED:
              this.logs = [...this.logs, `♻️ ${entry.name} updated!`];
              break;
            case Status.DELETED:
              this.logs = [...this.logs, `🗑 ${entry.name} deleted!`];
              break;
          }
        },
        error: () => {
          this.snackBar.open('An error occured while fetching data, please try again later.', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          })
        }
      });
    });
  }
}