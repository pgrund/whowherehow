import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, getPlayers, getMyInfo } from '@app/reducers';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { Player } from '@app/model/player';

@Component({
  selector: 'cluedo-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  public playerId: number;
  public player$: Observable<Player>;
  public me$: Observable<Player>;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private store:Store<State>) {}

  ngOnInit() {
    this.playerId = +this.route.snapshot.paramMap.get('uid');
    this.player$ = this.store.select(getPlayers)
      .map(list => list.find(obj => obj._links.self.href.endsWith(`/${this.playerId}`)) || null);
    this.me$ = this.store.select(getMyInfo);
  }

  ngOnDestroy() {

  }
}
