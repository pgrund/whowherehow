import { OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Chat } from '@app/models/chat';
import { Player } from '@shared/models/player';
import { Session } from '@shared/models/session';

@Component({
  selector: 'cluedo-chat-send',
  templateUrl: './chat-send.component.html',
  styleUrls: ['./chat-send.component.css']
})
export class ChatSendComponent implements OnInit {
  @Input() receiverId: number = null;
  @Input() players: Player[] = [];
  @Input() game: Session = null;
  @Output() sendChat = new EventEmitter<Chat>();

  public chat: FormGroup;

  constructor() {}

  ngOnInit() {
    this.chat = new FormGroup({
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(75)
      ]),
      receiverId: new FormControl(this.receiverId)
    });
  }

  send() {
    this.sendChat.emit(<Chat>this.chat.value);
  }
}
