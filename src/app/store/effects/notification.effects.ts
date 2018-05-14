import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { HttpErrorResponse } from '@angular/common/http';
import { Observable ,  Subject } from 'rxjs';





import { WebSocketService } from '@app/services';

import * as fromAdmin from '@administration/store';
import * as fromAction from '../actions';

import { Chat } from '@app/models/chat';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions, private wsService: WebSocketService) {}

  @Effect()
  addError$: any = this.actions$
    .ofType(
      fromAdmin.LOAD_PLAYERS_FAIL,
      fromAdmin.LOAD_SESSIONS_FAIL,
      fromAction.SEND_MESSAGE_FAILURE
    )
    .flatMap((action: any) => {
      const res: any[] = [new fromAction.AddErrorAction(action.payload)];
      if (
        action.payload instanceof HttpErrorResponse &&
        [401, 403].indexOf(action.payload.status) > -1
      ) {
        console.warn('need to logout', action.payload);
        // res.push(new fromRoot.LogoutAction());
        res.push(
          new fromAction.Go({
            path: ['/login'],
            extras: { replaceUrl: true }
          })
        );
      }
      return res;
    });

  @Effect()
  sendMessage$: any = this.actions$
    .ofType(fromAction.SEND_MESSAGE)
    .map((action: fromAction.SendAction) => action.payload)
    .map((message: Chat) => {
      try {
        this.wsService.sendMessage(message);
        return new fromAction.SendSuccessAction(message);
      } catch (err) {
        console.warn('cannot send no open connection');
        return new fromAction.SendFailureAction(err);
      }
    });

  @Effect()
  reloadPlayers$: Observable<
    fromAdmin.LoadPlayersAction
  > = this.actions$
    .ofType(
      fromAction.NOTIFY_PLAYER_ADDED,
      fromAction.NOTIFY_PLAYER_DROPPED,
      fromAction.NOTIFY_PLAYER_DROPPED_SESSION
    )
    .map(
      (action: fromAction.NotificationActions) =>
        new fromAdmin.LoadPlayersAction()
    );

  // TODO: move to admin module
  @Effect()
  reloadSessions$: Observable<
    fromAdmin.LoadSessionsAction
  > = this.actions$
    .ofType(
      fromAction.NOTIFY_SESSION_ADDED,
      fromAction.NOTIFY_SESSION_CLOSED,
      fromAction.NOTIFY_PLAYER_DROPPED_SESSION
    )
    .map(
      (action: fromAction.NotificationActions) =>
        new fromAdmin.LoadSessionsAction()
    );
}
