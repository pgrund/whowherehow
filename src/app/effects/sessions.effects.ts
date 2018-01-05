import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as sessions from '@app/actions/sessions.actions';

import { Session } from '@app/model/session';

@Injectable()
export class SessionsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }

  @Effect() get$ = this.actions$
      .ofType(sessions.LOAD_ALL)
      .switchMap(payload => this.http.get('/api/sessions')
        // If successful, dispatch success action with result
        .map((data:any) => new sessions.LoadAllSuccessAction(data._embedded.sessions))
        // If request fails, dispatch failed action
        .catch((err) => Observable.of(new sessions.LoadFailAction(err)))
      );
}
