import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedStateComponent } from './logged-state.component';

describe('LoggedStateComponent', () => {
  let component: LoggedStateComponent;
  let fixture: ComponentFixture<LoggedStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
