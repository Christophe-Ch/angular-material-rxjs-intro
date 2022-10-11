import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Mock, Status } from '../data.service';

@Component({
  selector: 'app-add-mock-dialog',
  templateUrl: './add-mock-dialog.component.html',
  styleUrls: ['./add-mock-dialog.component.css']
})
export class AddMockDialogComponent {
  entry = new Mock();

  constructor(private dialogRef: MatDialogRef<AddMockDialogComponent>) { 
    this.entry.createdAt = new Date();
    this.entry.status = Status.NEW;
  }

  onClickClose() {
    this.dialogRef.close();
  }
}
