import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuseComponent } from './accuse.component';

describe('AccuseComponent', () => {
  let component: AccuseComponent;
  let fixture: ComponentFixture<AccuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
