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

  @Effect() join$ = this.actions$
      .ofType(sessions.JOIN)
      .map((action: sessions.JoinAction) => {
        console.log(action);
        return action.payload;
      })
      .switchMap((url: string) => this.http.post('/api' + url, '')
        // If successful, dispatch success action with result
        .map((data:Session) => new sessions.JoinSuccessAction(data))
        // If request fails, dispatch failed action
        .catch((err) => {console.error(err); return Observable.of(new sessions.LoadFailAction(err))})
      );

  @Effect() kickout$ = this.actions$
      .ofType(sessions.KICK_OUT)
      .map((action: sessions.KickOutAction) => action.payload)
      .switchMap((kickout: {session:string, player:string}) => this.http.delete(`/api${kickout.session}${kickout.player}`)
        // If successful, dispatch success action with result
        .map((data:Session) => new sessions.KickOutSuccessAction(data))
        // If request fails, dispatch failed action
        .catch((err) => {console.error(err); return Observable.of(new sessions.LoadFailAction(err))})
      );

  @Effect() get$ = this.actions$
      .ofType(sessions.LOAD_ALL)
      .switchMap(payload => this.http.get('/api/sessions')
        // If successful, dispatch success action with result
        .map((data:any) => new sessions.LoadAllSuccessAction(<Session[]>data._embedded.sessions))
        // If request fails, dispatch failed action
        .catch((err) => Observable.of(new sessions.LoadFailAction(err)))
      );

  @Effect() create$ = this.actions$
      .ofType(sessions.CREATE_SESSION)
      .map((action: sessions.CreateSessionAction) => action.payload)
      .switchMap((name: string) => this.http.post('/api/sessions', { sessionName: name })
        // If successful, dispatch success action with result
        .map((data:any) => {
          return new sessions.CreateSessionSuccessAction(<Session>data)
        })
        // If request fails, dispatch failed action
        .catch((err) => Observable.of(new sessions.LoadFailAction(err)))
      );

      @Effect() close$ = this.actions$
          .ofType(sessions.CLOSE_SESSION)
          .map((action: sessions.CloseSessionAction) => action.payload)
          .switchMap((closeLink: string) => this.http.put('/api' + closeLink, null)
            // If successful, dispatch success action with result
            .map((data:any) => {
              return new sessions.CloseSessionSuccessAction(<Session>data)
            })
            // If request fails, dispatch failed action
            .catch((err) => Observable.of(new sessions.LoadFailAction(err)))
          );
}
