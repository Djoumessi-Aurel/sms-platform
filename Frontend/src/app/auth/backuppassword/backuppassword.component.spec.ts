import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackuppasswordComponent } from './backuppassword.component';

describe('BackuppasswordComponent', () => {
  let component: BackuppasswordComponent;
  let fixture: ComponentFixture<BackuppasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackuppasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackuppasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
