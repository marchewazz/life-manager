import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDashboardComponent } from './money-dashboard.component';

describe('MoneyDashboardComponent', () => {
  let component: MoneyDashboardComponent;
  let fixture: ComponentFixture<MoneyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
