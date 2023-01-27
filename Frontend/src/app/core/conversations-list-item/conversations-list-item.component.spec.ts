import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsListItemComponent } from './conversations-list-item.component';

describe('ConversationsListItemComponent', () => {
  let component: ConversationsListItemComponent;
  let fixture: ComponentFixture<ConversationsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
