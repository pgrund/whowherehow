import { Component, Input, ViewEncapsulation } from "@angular/core";

import { Chat } from "@app/models/chat";
import { Player } from "@app/models/player";

@Component({
  selector: "cluedo-chat-item",
  templateUrl: "./chat-item.component.html",
  styleUrls: ["./chat-item.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ChatItemComponent {
  @Input() msg: Chat;
  @Input() debug: boolean = false;
  @Input() me: Player = null;

  constructor() {}

  fromMe() {
    return this.me && this.msg.sender == this.me.name;
  }

  toSession() {
    return !this.msg.receiverId;
  }
}
