import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as error from '@app/actions/error.actions';
import * as login from '@app/actions/login.actions';
import * as player from '@app/actions/player.actions';

@Injectable()
export class ErrorEffects {
  constructor(
    private actions$: Actions
  ) { }


  @Effect() addLoginError$ = this.actions$
      .ofType(login.LOGIN_FAILURE, login.LOGOUT_FAILURE, player.LOAD_FAIL)
      .map((action:any) => {
        new error.AddErrorAction(action.payload)
      });
}
