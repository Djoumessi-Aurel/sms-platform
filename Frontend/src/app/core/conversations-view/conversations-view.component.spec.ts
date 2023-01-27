import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsViewComponent } from './conversations-view.component';

describe('ConversationsViewComponent', () => {
  let component: ConversationsViewComponent;
  let fixture: ComponentFixture<ConversationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
