import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromAuth from '@auth/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';

import { Player, PlayerState } from '@shared/models/player';
import { HalLinks } from '@shared/models/hal';

import { environment } from '@env/environment';

@Component({
  templateUrl: './players.component.html',
  styles: ['']
})
export class PlayersComponent {
  players$: Observable<Player[]>;
  myself$: Observable<Player>;
  public debug = !environment.production;

  constructor(private store: Store<fromRoot.State>) {
    this.players$ = this.store.select(fromStore.getAllPlayers);
    this.myself$ = this.store.select(fromAuth.getMyInfo);
  }

  delete(player: Player) {
    // if (this.debug) {
    //   this.store.dispatch(new fromRoot.LogoutAction());
    // } else {
    alert('available only in debug mode');
    // }
  }

  loadAll() {
    if (this.debug) {
      this.store.dispatch(new fromStore.LoadPlayersAction());
    } else {
      alert('available only in debug mode');
    }
  }

  invite(player: Player) {
    this.store.dispatch(
      new fromStore.InviteSessionAction(player._links.self.href)
    );
  }

  kickOut(player: Player) {
    this.store.dispatch(
      new fromStore.KickOutSessionAction({
        session: player._links.game.href,
        player: player._links.self.href
      })
    );
  }

  approve(player: Player) {
    // approve join request or invitation
    this.store.dispatch(
      new fromStore.ApproveSessionAction(player._links.approve.href)
    );
  }
}
