import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataService, Mock, Status } from '../data.service';
import { EditMockDialogComponent } from '../edit-mock-dialog/edit-mock-dialog.component';
import { AddMockDialogComponent } from '../add-mock-dialog/add-mock-dialog.component';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-entries',
  templateUrl: './edit-entries.component.html',
  styleUrls: ['./edit-entries.component.css']
})
export class EditEntriesComponent {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions']
  // data: Mock[] = [];
  @Output() reset = new EventEmitter();
  @Output() stepComplete = new EventEmitter();
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private dialog: MatDialog, public dataService: DataService) { }

  onClickEdit(entry: Mock) {
    const dialogRef = this.dialog.open(EditMockDialogComponent, {
      data: entry
    });

    dialogRef.afterClosed().subscribe((result: Mock) => {
      if (!result) return;

      entry.name = result.name;
      entry.status = Status.CHANGED;
    });
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddMockDialogComponent);

    dialogRef.afterClosed().subscribe((result: Mock) => {
      if (!result) return;

      this.dataService.add(result);
    });
  }

  onClickDelete(id: number) {
    this.dataService.remove(id);
  }

  onClickReset() {
    this.reset.emit();
  }

  onClickContinue() {
    this.stepComplete.emit();
  }
}
