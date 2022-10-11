import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMockDialogComponent } from './edit-mock-dialog.component';

describe('EditMockDialogComponent', () => {
  let component: EditMockDialogComponent;
  let fixture: ComponentFixture<EditMockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMockDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
