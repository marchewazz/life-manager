import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyFormComponent } from './money-form.component';

describe('MoneyFormComponent', () => {
  let component: MoneyFormComponent;
  let fixture: ComponentFixture<MoneyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
