import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getMyInfo } from '@app/reducers';

import {Observable} from 'rxjs';

import { Go } from '@app/actions/router.actions';
import { LogoutRequestAction } from '@app/actions/login.actions';
import { LoadAllAction as LoadAllPlayers } from '@app/actions/player.actions';
import { LoadAllAction as LoadAllSessions } from '@app/actions/sessions.actions';

import { Player } from '@app/model/player';

import { environment } from '@env/environment';

@Component({
  selector: 'cluedo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() me: Player = null;

  public returnUrl = '/';
  public debug: boolean;

  constructor(private store:Store<State>) {
    this.debug = !environment.production;
  }

  ngOnInit() {}

  logout() {
    this.store.dispatch(new LogoutRequestAction(this.me));
  }

  loadPlayers() {
    this.store.dispatch(new LoadAllPlayers());
  }

  loadSessions() {
    this.store.dispatch(new LoadAllSessions());
  }

  loadAll() {
    this.loadSessions();
    this.loadPlayers();
  }

  test() {
    this.store.dispatch( new Go({ path:['login'], query: { returnUrl: this.returnUrl }}))
  }
}
