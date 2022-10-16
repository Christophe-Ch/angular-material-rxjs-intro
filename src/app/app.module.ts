import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material imports
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';

import { LoadDataComponent } from './load-data/load-data.component';
import { EditEntriesComponent } from './edit-entries/edit-entries.component';
import { EditMockDialogComponent } from './edit-mock-dialog/edit-mock-dialog.component';
import { AddMockDialogComponent } from './add-mock-dialog/add-mock-dialog.component';
import { SaveEntriesComponent } from './save-entries/save-entries.component';
import { BaseDataService, DataService, MockDataService } from './data.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoadDataComponent,
    EditEntriesComponent,
    EditMockDialogComponent,
    AddMockDialogComponent,
    SaveEntriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTreeModule
  ],
  providers: [
    { provide: BaseDataService, useClass: environment.useMock ? MockDataService : DataService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
