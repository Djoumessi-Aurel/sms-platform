import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsListItemComponent } from './contacts-list-item.component';

describe('ContactsListItemComponent', () => {
  let component: ContactsListItemComponent;
  let fixture: ComponentFixture<ContactsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
