import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { WebSocketService } from '@app/services/web-socket.service';

import * as notify from '@app/actions/notification.actions';
import * as login from '@app/actions/login.actions';
import * as player from '@app/actions/player.actions';
import * as session from '@app/actions/sessions.actions';

import { Chat } from '@app/model/chat';

@Injectable()
export class NotificationEffects {


  constructor( private actions$: Actions, private wsService: WebSocketService ) {
  }


  @Effect() addLoginError$:any = this.actions$
      .ofType(login.LOGIN_FAILURE, login.LOGOUT_FAILURE, player.LOAD_FAIL, session.LOAD_FAIL)
      .map((action:any) => {
        console.error(action);
        return new notify.AddErrorAction(action.payload)
      });

  @Effect() sendMessage$:any = this.actions$
      .ofType(notify.SEND_MESSAGE)
      .map((action:notify.SendAction) => action.payload)
      .do((message:Chat) => this.wsService.sendMessage(message))
      .map((message:Chat) => new notify.SendSuccessAction(message))
}
