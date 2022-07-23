import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonloggedStateComponent } from './nonlogged-state.component';

describe('NonloggedStateComponent', () => {
  let component: NonloggedStateComponent;
  let fixture: ComponentFixture<NonloggedStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonloggedStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonloggedStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
