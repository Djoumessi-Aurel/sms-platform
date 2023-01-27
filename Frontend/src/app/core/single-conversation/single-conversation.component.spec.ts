import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleConversationComponent } from './single-conversation.component';

describe('SingleConversationComponent', () => {
  let component: SingleConversationComponent;
  let fixture: ComponentFixture<SingleConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
