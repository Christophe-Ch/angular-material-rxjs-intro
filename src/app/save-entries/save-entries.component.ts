import { Component } from '@angular/core';
import { DataService, Mock, Status } from '../data.service';

@Component({
  selector: 'app-save-entries',
  templateUrl: './save-entries.component.html',
  styleUrls: ['./save-entries.component.css']
})
export class SaveEntriesComponent {
  data: Mock[] = [];
  logs: string[] = [];

  constructor(private dataService: DataService) {
    this.dataService.dataSubject.subscribe({
      next: (data) => this.data = data
    })
  }

  save() {
    this.data.forEach(entry => {
      if (entry.status === Status.UNCHANGED) return;

      this.dataService.save(entry, () => {
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
      });
    });
  }
}