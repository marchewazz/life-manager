import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyOperationComponent } from './money-operation.component';

describe('MoneyOperationComponent', () => {
  let component: MoneyOperationComponent;
  let fixture: ComponentFixture<MoneyOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
