import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as notify from '@app/actions/notification.actions';
import * as login from '@app/actions/login.actions';
import * as player from '@app/actions/player.actions';
import * as session from '@app/actions/sessions.actions';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions
  ) { }


  @Effect() addLoginError$:any = this.actions$
      .ofType(login.LOGIN_FAILURE, login.LOGOUT_FAILURE, player.LOAD_FAIL, session.LOAD_FAIL)
      .map((action:any) => {
        console.log(action);
        return new notify.AddErrorAction(action.payload)
      });
}
