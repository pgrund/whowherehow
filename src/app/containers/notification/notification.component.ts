import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Subscription } from "rxjs";

import * as fromStore from "../../store";
import { MatSnackBar } from "@angular/material";

import {
  ErrorNotificationComponent,
  ChatNotificationComponent
} from "@shared/components";

import { Chat } from "@app/models/chat";

@Component({
  selector: "cluedo-notification",
  template: "<span>notification</span>"
})
export class NotificationComponent implements OnDestroy {
  private errorSub: Subscription;
  private chatSub: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    public snackBar: MatSnackBar
  ) {
    this.errorSub = this.store
      .select(fromStore.getLastError)
      .subscribe((err: Error) => {
        let snackBarRef = this.snackBar.openFromComponent(
          ErrorNotificationComponent,
          {
            data: err,
            panelClass: "error"
          }
        );
        snackBarRef.instance.snackbar = snackBarRef;
        snackBarRef.afterDismissed().subscribe(() => {
          console.log("dismissed, auto ack error ... ", err);
          this.store.dispatch(new fromStore.AckErrorAction(0));
        });
      });
    this.chatSub = this.store
      .select(fromStore.getLastMessage)
      .subscribe((chat: Chat) => {
        let snackBarRef = this.snackBar.openFromComponent(
          ChatNotificationComponent,
          { data: chat, panelClass: "chat-info" }
        );
        snackBarRef.instance.snackbar = snackBarRef;
      });
  }

  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
    if (this.chatSub) {
      this.chatSub.unsubscribe();
    }
  }
}
