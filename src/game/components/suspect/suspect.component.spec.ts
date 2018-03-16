import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectComponent } from './suspect.component';

describe('SuspectComponent', () => {
  let component: SuspectComponent;
  let fixture: ComponentFixture<SuspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
