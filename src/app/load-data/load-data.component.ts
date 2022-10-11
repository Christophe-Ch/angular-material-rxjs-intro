import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService, Mock, Status } from '../data.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent {
  @Input() data!: Mock[];
  @Output() dataChange = new EventEmitter<Mock[]>();
  @Output() stepComplete = new EventEmitter();

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  loadData() {
    this.dataService.load().subscribe({
      next: (result) => {
        this.dataChange.emit(result.map(entry => ({ ...entry, status: Status.UNCHANGED })));
        this.stepComplete.emit();
      },
      error: () => {
        this.snackBar.open('An error occured while fetching data, please try again later.', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        })
      }
    });
  }

}
