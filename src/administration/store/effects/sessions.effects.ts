import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromAuth from '@auth/store';

import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromActions from '../actions';

import { Session } from '@shared/models/session';
import { Player } from '@shared/models/player';

@Injectable()
export class SessionsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {}

  @Effect()
  join$ = this.actions$.ofType(fromActions.JOIN_SESSION).pipe(
    map((action: fromActions.JoinSessionAction) => {
      console.log('==>>> POST %s (%s)', action.payload, document.cookie);
      return action.payload;
    }),
    withLatestFrom(this.store.select(fromAuth.getMyInfo)),
    switchMap(([url, me]) => {
      console.log(url, me);
      return (
        this.http
          .post('/api' + url, '')
          // If successful, dispatch success action with result
          .flatMap((data: Player) => [
            new fromActions.JoinSessionSuccessAction(data),
            new fromActions.UpdatePlayerAction(data)
          ])
          // If request fails, dispatch failed action
          .catch(err => {
            console.error(err);
            return Observable.of(new fromActions.LoadSessionsFailAction(err));
          })
      );
    })
  );

  @Effect()
  invite$ = this.actions$.ofType(fromActions.INVITE_SESSION).pipe(
    map((action: fromActions.InviteSessionAction) => {
      console.log('==>>> PUT %s (%s)', action.payload, document.cookie);
      return action.payload;
    }),
    withLatestFrom(this.store.select(fromAuth.getMyInfo)),
    switchMap(([player, me]) => {
      console.log(player, me);
      return (
        this.http
          .put(`/api${me._links.game.href}/${player}`, '')
          // If successful, dispatch success action with result
          .flatMap((data: Player) => [
            new fromActions.InviteSessionSuccessAction(data),
            new fromActions.UpdatePlayerAction(data)
          ])
          // If request fails, dispatch failed action
          .catch(err => {
            console.error(err);
            return Observable.of(new fromActions.LoadSessionsFailAction(err));
          })
      );
    })
  );

  @Effect()
  approve$ = this.actions$.ofType(fromActions.APPROVE_SESSION).pipe(
    map((action: fromActions.ApproveSessionAction) => action.payload),
    switchMap((url: string) =>
      this.http
        .put(`/api${url}`, null)
        // If successful, dispatch success action with result
        .flatMap((data: Session) => [
          new fromActions.UpdateSessionAction(data),
          new fromActions.LoadPlayersAction()
        ])
        // If request fails, dispatch failed action
        .catch(err => {
          console.error(err);
          return Observable.of(new fromActions.LoadSessionsFailAction(err));
        })
    )
  );

  @Effect()
  kickout$ = this.actions$.ofType(fromActions.KICK_OUT_SESSION).pipe(
    map((action: fromActions.KickOutSessionAction) => action.payload),
    switchMap((kickout: { session: string; player: string }) =>
      this.http
        .delete(`/api${kickout.session}${kickout.player}`)
        // If successful, dispatch success action with result
        .flatMap((data: Session) => [
          new fromActions.UpdateSessionAction(data),
          new fromActions.LoadPlayersAction()
        ])
        // If request fails, dispatch failed action
        .catch(err => {
          console.error(err);
          return Observable.of(new fromActions.LoadSessionsFailAction(err));
        })
    )
  );

  @Effect()
  get$ = this.actions$.ofType(fromActions.LOAD_SESSIONS).pipe(
    switchMap(payload =>
      this.http
        .get('/api/sessions')
        // If successful, dispatch success action with result
        .map(
          (data: any) =>
            new fromActions.LoadSessionsSuccessAction(<Session[]>data._embedded
              .sessions)
        )
        // If request fails, dispatch failed action
        .catch(err =>
          Observable.of(new fromActions.LoadSessionsFailAction(err))
        )
    )
  );

  @Effect()
  create$ = this.actions$.ofType(fromActions.CREATE_SESSION).pipe(
    map((action: fromActions.CreateSessionAction) => action.payload),
    switchMap((name: string) =>
      this.http
        .post('/api/sessions', { sessionName: name })
        // If successful, dispatch success action with result
        .map((data: any) => {
          return new fromActions.UpdateSessionAction(<Session>data);
        })
        // If request fails, dispatch failed action
        .catch(err =>
          Observable.of(new fromActions.LoadSessionsFailAction(err))
        )
    )
  );

  @Effect()
  close$ = this.actions$.ofType(fromActions.CLOSE_SESSION).pipe(
    map((action: fromActions.CloseSessionAction) => action.payload),
    withLatestFrom(this.store.select(fromAuth.getMyInfo)),
    switchMap(([closeLink, me]) => {
      console.log(closeLink, me);
      return (
        this.http
          .put('/api' + closeLink, null)
          // If successful, dispatch success action with result
          .map((data: any) => {
            return new fromActions.UpdateSessionAction(<Session>data);
          })
          // If request fails, dispatch failed action
          .catch(err =>
            Observable.of(new fromActions.LoadSessionsFailAction(err))
          )
      );
    })
  );

  // @Effect()
  // active$ = this.actions$
  //   .ofType(fromActions.ACTIVE_SESSION)
  //   .withLatestFrom(this.store$.select(getMyGame))
  //   .switchMap(([action, game]) => {
  //     console.log(game);
  //     if (game == null) {
  //       return Observable.of(
  //         new fromActions.LoadSessionsFailAction(
  //           new Error("not part in any game")
  //         )
  //       );
  //     }
  //     return (
  //       this.http
  //         .get(`/api${game._links.self.href}/turn`)
  //         // If successful, dispatch success action with result
  //         .flatMap((session: Session) => [
  //           new fromActions.UpdateSessionAction(session),
  //           new fromActions.SelectSessionAction(session._links.self)
  //         ])
  //         // If request fails, dispatch failed action
  //         .catch(err =>
  //           Observable.of(new fromActions.LoadSessionsFailAction(err))
  //         )
  //     );
  //   });
}
