import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '@app/store';
import * as fromAuth from '@auth/store';
import * as fromStore from '../../store';

import { Session } from '@shared/models/session';
import { Player } from '@shared/models/player';

@Component({
  templateUrl: './session-item.component.html'
})
export class SessionItemComponent implements OnInit {
  public session$: Observable<Session>;
  public myself$: Observable<Player>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.session$ = this.store.select(fromStore.getSelectedSession);
    this.myself$ = this.store.select(fromAuth.getMyInfo);
  }
}
