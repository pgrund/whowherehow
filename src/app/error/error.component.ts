import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'cluedo-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent {
   public snackbar: MatSnackBarRef<ErrorComponent>;
   constructor(@Inject(MAT_SNACK_BAR_DATA) public error: Error) {
     setTimeout(() => this.snackbar.dismiss(), 5000);
   }

   dismiss() {
     if(this.snackbar) {
       this.snackbar.dismiss();
     }
   }
}
