import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService, Mock, Status } from '../data.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent {
  @Output() stepComplete = new EventEmitter();

  constructor(private dataService: DataService) { }

  loadData() {
    this.dataService.load().add(() => this.stepComplete.emit());
  }

}
