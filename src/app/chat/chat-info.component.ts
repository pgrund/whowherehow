import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

import { Chat } from '@app/model/chat';

@Component({
  selector: 'cluedo-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class ChatInfoComponent {
   public snackbar: MatSnackBarRef<ChatInfoComponent>;

   constructor(@Inject(MAT_SNACK_BAR_DATA) public msg: Chat) {
     //setTimeout(() => this.snackbar.dismiss(), 7500);
   }

   dismiss() {
     if(this.snackbar) {
       this.snackbar.dismiss();
     }
   }
}
