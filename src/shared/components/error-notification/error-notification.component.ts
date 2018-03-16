import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material";

@Component({
  selector: "cluedo-error-notification",
  templateUrl: "./error-notification.component.html",
  styleUrls: ["./error-notification.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ErrorNotificationComponent {
  public snackbar: MatSnackBarRef<ErrorNotificationComponent>;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public error: Error) {
    //setTimeout(() => this.snackbar.dismiss(), 5000);
  }

  dismiss() {
    if (this.snackbar) {
      this.snackbar.dismiss();
    }
  }
}
