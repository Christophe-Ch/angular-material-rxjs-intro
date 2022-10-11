import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mock, Status } from '../data.service';

@Component({
  selector: 'app-edit-mock-dialog',
  templateUrl: './edit-mock-dialog.component.html',
  styleUrls: ['./edit-mock-dialog.component.css']
})
export class EditMockDialogComponent {
  entry!: Mock;

  constructor(private dialogRef: MatDialogRef<EditMockDialogComponent>, @Inject(MAT_DIALOG_DATA) entry: Mock) { 
    this.entry = structuredClone(entry);
  }

  onClickClose() {
    this.dialogRef.close();
  }
}
