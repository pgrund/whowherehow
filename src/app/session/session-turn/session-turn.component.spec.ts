import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTurnComponent } from './session-turn.component';

describe('SessionTurnComponent', () => {
  let component: SessionTurnComponent;
  let fixture: ComponentFixture<SessionTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
