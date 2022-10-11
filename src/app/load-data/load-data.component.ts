import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent {
  @Output() stepComplete = new EventEmitter();

  constructor(private dataService: DataService) { }

  loadData() {
    this.dataService.load(() => this.stepComplete.emit());
  }

}
