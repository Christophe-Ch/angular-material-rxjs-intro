import { Component } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
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
    this.dataService.data.subscribe({
      next: (data) => this.data = data
    })
  }

  save() {
    this.logs = [];
    
    const subjects: Subject<unknown>[] = [];

    this.data.forEach(entry => {
      if (entry.status === Status.UNCHANGED) return;

      const subject = this.dataService.save(entry);
      subject.subscribe(() => {
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

      subjects.push(subject);
    });

    forkJoin(subjects).subscribe({
      next: () => {
        this.logs = [...this.logs, '🔥 API has been updated! Reloading data... 🔥'];
        this.dataService.load(() => this.logs = [...this.logs, '👍 Data has been loaded, you can go back to editing!'])
      }
    })
  }
}