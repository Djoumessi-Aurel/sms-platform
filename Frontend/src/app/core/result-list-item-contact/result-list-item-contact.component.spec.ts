import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListItemContactComponent } from './result-list-item-contact.component';

describe('ResultListItemContactComponent', () => {
  let component: ResultListItemContactComponent;
  let fixture: ComponentFixture<ResultListItemContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultListItemContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListItemContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
