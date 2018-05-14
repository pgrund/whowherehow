import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs';





import { HttpClient } from '@angular/common/http';

import * as PlayerActions from '../actions/player.actions';

import { Player } from '@shared/models/player';

@Injectable()
export class PlayerEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  get$: Observable<PlayerActions.PlayerActions> = this.actions$
    .ofType(PlayerActions.LOAD_PLAYERS)
    .mergeMap((action: any) => {
      return this.http
        .get<Player[]>('/api/players')
        .map((data: any) => {
          return new PlayerActions.LoadPlayersSuccessAction(<Player[]>data
            ._embedded.players);
        })
        .catch(err =>
          Observable.of(new PlayerActions.LoadPlayersFailAction(err))
        );
    });
}
