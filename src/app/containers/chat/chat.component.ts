import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Observable ,  Subscription } from "rxjs";

import { Store } from "@ngrx/store";

import * as fromAdmin from "@administration/store";
import * as fromStore from "../../store";

import { Chat } from "@app/models/chat";
import { Player } from "@shared/models/player";
import { Session } from "@shared/models/session";

@Component({
  selector: "cluedo-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent {
  public messages$: Observable<Chat[]>;
  public players$: Observable<Player[]>;
  public game$: Observable<Session>;

  public me$: Observable<Player>;

  public chat = new FormGroup({
    message: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(75)
    ]),
    receiverId: new FormControl("")
  });

  constructor(private store: Store<fromStore.State>) {
    this.messages$ = this.store.select(fromStore.getAllMessages);
    // this.subscription = this.store.select(getChatMessages).subscribe( msg => {
    //   this.messages = msg;
    // })
    this.players$ = this.store.select(fromAdmin.getAllPlayers);
    // this.game$ = this.store.select(fromStore.get);
  }

  onSend(message: Chat) {
    this.store.dispatch(new fromStore.SendAction(message));
  }
}
