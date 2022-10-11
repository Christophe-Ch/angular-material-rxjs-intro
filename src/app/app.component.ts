import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { DataService, Mock } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-material';

  @ViewChild('stepper') private stepper!: MatStepper;

  constructor(private dataService: DataService) { }

  onStepComplete() {
    this.stepper.next();
  }

  reset() {
    this.dataService.load();
  }
}
