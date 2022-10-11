import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Mock, Status } from '../data.service';
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
  @Input() data!: Mock[];
  @Output() dataChange = new EventEmitter<Mock[]>();
  @Output() reset = new EventEmitter();
  @Output() stepComplete = new EventEmitter();
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private dialog: MatDialog) { }

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

      this.data = [...this.data, result];
      this.dataChange.emit(this.data);
    });
  }

  onClickDelete(id: number) {
    this.data = this.data.map(entry => {
      if (entry.id === id) {
        entry.status = Status.DELETED;
      }

      return entry;
    });
  }

  onClickReset() {
    this.reset.emit();
  }

  onClickContinue() {
    this.stepComplete.emit();
  }

  onListDrop(event: CdkDragDrop<Mock[]>) {
    const newData = this.data.map(entry => structuredClone(entry));
    moveItemInArray(newData, event.previousIndex, event.currentIndex);
    
    this.data = newData;
  }
}
