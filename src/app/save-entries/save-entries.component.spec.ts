import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEntriesComponent } from './save-entries.component';

describe('SaveEntriesComponent', () => {
  let component: SaveEntriesComponent;
  let fixture: ComponentFixture<SaveEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
