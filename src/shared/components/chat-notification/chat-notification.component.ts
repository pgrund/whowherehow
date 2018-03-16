import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material";

import { Chat } from "@app/models/chat";

@Component({
  selector: "cluedo-chat-notification",
  templateUrl: "./chat-notification.component.html",
  styleUrls: ["./chat-notification.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ChatNotificationComponent {
  public snackbar: MatSnackBarRef<ChatNotificationComponent>;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public msg: Chat) {
    setTimeout(() => this.snackbar.dismiss(), 5000);
  }

  dismiss() {
    if (this.snackbar) {
      this.snackbar.dismiss();
    }
  }
}
