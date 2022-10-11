import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataService, Mock, Status } from '../data.service';
import { EditMockDialogComponent } from '../edit-mock-dialog/edit-mock-dialog.component';
import { AddMockDialogComponent } from '../add-mock-dialog/add-mock-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-edit-entries',
  templateUrl: './edit-entries.component.html',
  styleUrls: ['./edit-entries.component.css']
})
export class EditEntriesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions']
  tableSource = new MatTableDataSource<Mock>([]);
  @Output() reset = new EventEmitter();
  @Output() stepComplete = new EventEmitter();
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, public dataService: DataService) {
    this.dataService.data.subscribe({
      next: (data) => this.tableSource.data = data.filter(entry => entry.status !== Status.DELETED)
    })
  }

  ngAfterViewInit(): void {
    this.tableSource.paginator = this.paginator;
  }

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
