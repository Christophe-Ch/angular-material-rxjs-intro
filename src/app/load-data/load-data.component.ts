import { Component, EventEmitter, Output } from '@angular/core';
import { BaseDataService, DataService } from '../data.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent {
  @Output() stepComplete = new EventEmitter();

  constructor(private dataService: BaseDataService) { }

  loadData() {
    this.dataService.load(() => this.stepComplete.emit());
  }

}
