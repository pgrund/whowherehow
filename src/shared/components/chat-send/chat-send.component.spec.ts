import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSendComponent } from './chat-send.component';

describe('ChatSendComponent', () => {
  let component: ChatSendComponent;
  let fixture: ComponentFixture<ChatSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
