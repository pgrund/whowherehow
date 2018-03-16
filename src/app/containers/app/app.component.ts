import { Component, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import { Store } from "@ngrx/store";

import { Subscription } from "rxjs/Subscription";

import * as fromStore from "../../store";
import * as fromAdmin from "@administration/store";
import { Chat } from "@app/models/chat";
import {
  ErrorNotificationComponent,
  ChatNotificationComponent
} from "@shared/components";

@Component({
  selector: "cluedo-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  private chatSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    public snackBar: MatSnackBar
  ) {
    this.chatSubscription = this.store
      .select(fromStore.getLastMessage)
      .subscribe((msg: Chat) => {
        let snackBarRef = this.snackBar.openFromComponent(
          ChatNotificationComponent,
          { data: msg, panelClass: "chat-info" }
        );
        snackBarRef.instance.snackbar = snackBarRef;
        snackBarRef.afterDismissed().subscribe(() => {
          console.debug("dismissed CHAT, auto ack ... ", msg);
          //this.store.dispatch(new fromStore.AckErrorAction(0));
        });
      });
    this.errorSubscription = this.store
      .select(fromStore.getLastError)
      .subscribe((err: Error) => {
        if (err) {
          let snackBarRef = this.snackBar.openFromComponent(
            ErrorNotificationComponent,
            {
              data: err,
              panelClass: "error"
            }
          );
          snackBarRef.instance.snackbar = snackBarRef;
          snackBarRef.afterDismissed().subscribe(() => {
            console.debug("dismissed, auto ack error ... ", err);
            this.store.dispatch(new fromStore.AckErrorAction(0));
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }
  logout() {
    alert("LOGOUT");
  }
}
