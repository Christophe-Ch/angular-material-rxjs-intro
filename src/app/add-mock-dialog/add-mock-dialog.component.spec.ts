import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMockDialogComponent } from './add-mock-dialog.component';

describe('AddMockDialogComponent', () => {
  let component: AddMockDialogComponent;
  let fixture: ComponentFixture<AddMockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMockDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
