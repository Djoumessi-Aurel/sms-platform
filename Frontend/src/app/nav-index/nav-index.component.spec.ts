import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIndexComponent } from './nav-index.component';

describe('NavIndexComponent', () => {
  let component: NavIndexComponent;
  let fixture: ComponentFixture<NavIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
