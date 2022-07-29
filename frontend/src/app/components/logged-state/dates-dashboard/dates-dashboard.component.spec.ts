import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesDashboardComponent } from './dates-dashboard.component';

describe('DatesDashboardComponent', () => {
  let component: DatesDashboardComponent;
  let fixture: ComponentFixture<DatesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
