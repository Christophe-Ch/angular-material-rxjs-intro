import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Mock } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-material';

  data: Mock[] = [];
  dataBackup: Mock[] = [];

  @ViewChild('stepper') private stepper!: MatStepper;

  onStepComplete() {
    this.dataBackup = this.data.map(entry => structuredClone(entry));
    this.stepper.next();
  }

  reset() {
    this.data = this.dataBackup.map(entry => structuredClone(entry));
  }
}
