import { Component, OnDestroy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getMyInfo, getLastError, getLastChatMessage } from '@app/reducers';

import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { ErrorComponent } from '@app/error/error.component';
import { ChatInfoComponent } from '@app/chat/chat-info.component';

import { Player } from '@app/model/player';
import { Chat } from '@app/model/chat';

import { AckErrorAction } from '@app/actions/notification.actions';

@Component({
  selector: 'cluedo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  public mySelf: Player;

  private subscriptionMe: Subscription;
  private subscriptionError: Subscription;
  private subscriptionChat: Subscription;

  constructor(private store:Store<State>, public snackBar: MatSnackBar) {
    this.subscriptionMe = this.store.select(getMyInfo).subscribe( me => {
      this.mySelf = me;
    });
    this.subscriptionError = this.store.select(getLastError).subscribe( error => {
      if(error) {
        let snackBarRef = this.snackBar.openFromComponent(ErrorComponent, { data: error });
        snackBarRef.instance.snackbar = snackBarRef;
        snackBarRef.afterDismissed().subscribe(() => {
          console.log('dismissed, auto ack ... ', error);
          this.store.dispatch(new AckErrorAction(0));
        });
      }
    });
    this.subscriptionChat = this.store.select(getLastChatMessage).subscribe( (msg:Chat) => {
      if(msg) {
        let snackBarRef = this.snackBar.openFromComponent(ChatInfoComponent, { data: msg, panelClass: "chat-info" });
        snackBarRef.instance.snackbar = snackBarRef;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionMe.unsubscribe();
    this.subscriptionError.unsubscribe();
  }

}
