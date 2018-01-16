import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { State, getChatMessages, getMyInfo, getPlayers } from '@app/reducers';
import { SendAction } from '@app/actions/notification.actions';

import { Chat } from '@app/model/chat';
import { Player } from '@app/model/player';

@Component({
  selector: 'cluedo-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public messages$:Observable<Chat[]>;
  public players$:Observable<Player[]>;

  public chat = new FormGroup({
    message: new FormControl( '', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(75),
    ]),
    receiverId: new FormControl('')
  });

  private me: Player;
  private subscription:Subscription;

  constructor(private store:Store<State>) {
    this.messages$ = this.store.select(getChatMessages);
    this.players$ = this.store.select(getPlayers);
    this.subscription = this.store.select(getMyInfo).subscribe((myself:Player) => {
      this.me = myself;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  send(receiver:number = null) {
    console.log(this.chat.value);
    this.store.dispatch(new SendAction(<Chat>this.chat.value));
  }

}
