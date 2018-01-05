import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient} from '@angular/common/http';


import * as player from '../actions/player.actions';

import { Player } from '@app/model/player';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }

  @Effect()
    get$: Observable<player.Actions>  = this.actions$
      .ofType(player.LOAD_ALL)
      .mergeMap((action: player.LoadAllAction) => {
          return this.http.get<Player[]>('/api/players')
            .map( (data:any) => {
              return new player.LoadAllSuccessAction(<Player[]>data._embedded.players)
            })
            .catch( err => Observable.of(new player.LoadFailAction(err)))
        });
}
