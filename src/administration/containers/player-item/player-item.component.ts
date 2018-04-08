import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '@app/store';
import * as fromAuth from '@auth/store';
import * as fromStore from '../../store';

import { Player } from '@shared/models/player';

@Component({
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss']
})
export class PlayerItemComponent implements OnInit {
  public player$: Observable<Player>;
  public myself$: Observable<Player>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.player$ = this.store.select(fromStore.getSelectedPlayer);
    this.myself$ = this.store.select(fromAuth.getMyInfo);
  }
}
