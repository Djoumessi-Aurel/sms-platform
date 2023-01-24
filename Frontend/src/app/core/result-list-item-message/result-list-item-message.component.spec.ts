import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListItemMessageComponent } from './result-list-item-message.component';

describe('ResultListItemMessageComponent', () => {
  let component: ResultListItemMessageComponent;
  let fixture: ComponentFixture<ResultListItemMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultListItemMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListItemMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
