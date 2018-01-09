import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getSessions, getMyInfo } from '@app/reducers';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import {DataSource} from '@angular/cdk/collections';

import { Session, SessionState } from '@app/model/session';
import { Player } from '@app/model/player';
import { HalLinks, HalLink } from '@app/model/hal';

import * as sessions from '@app/actions/sessions.actions';

class DisplaySession extends Session {

  state: SessionState;
  players: HalLink[];
  actions: HalLinks = { self : null};


  constructor(private session:Session) {
    super();
    Object.keys(session).forEach( key => {
      this[key] = session[key];
    })
    // this._links = session._links;

    this.players = session._links.players;
    this.state = session._links.start ? SessionState.OPEN : SessionState.CLOSED;

    Object.keys(session._links)
      .filter( key => ['self', 'turn', 'start'].indexOf(key)>-1)
      .forEach(key => this.actions[key] = session._links[key]);
  }
}

@Component({
  selector: 'cluedo-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit, OnDestroy {

  displayedColumns = ['sessionName', 'players', 'actions', '_links'];
  dataSource = new SessionListDataSource(this.store.select(getSessions));

  me: Player;

  private subscription:Subscription;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.dataSource.filter = filterValue;
  }

  constructor(private store:Store<State>) {
    this.subscription = this.store.select(getMyInfo).subscribe((myself:Player) => {
      this.me = myself;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isDirectorOfGame(links: HalLinks) {
    return links.admin.href == this.me._links.self.href;
  }
  isPlayerOfGame(links: HalLinks) {
    return this.me._links.game && links.self.href == this.me._links.game.href;
  }
  isPlayerOfAnyGame() {
    return this.me._links.game != null;
  }

  closeSession(sessionLink: string) {
    this.dummy('CLOSE SESSION', sessionLink);
  }
  joinSession(sessionLink: string) {
    this.store.dispatch(new sessions.JoinAction(sessionLink));
  }
  kickOutOfSession(sessionUrl: string, playerUrl: string) {
    this.store.dispatch(new sessions.KickOutAction({ session: sessionUrl, player: playerUrl}));
  }

  newSession(name: string) {
    if(name && name.trim().length>0) {
      this.store.dispatch(new sessions.CreateSessionAction(name));
    }
  }
  dummy(name:string, url:string) {
    alert(name + '\n' + url);
  }
}

export class SessionListDataSource extends DataSource<Session> {

    filterChange = new BehaviorSubject('');
    constructor(private examples$: Observable<Session[]>) {
      super();
    }

    get filter(): string {
      return this.filterChange.value;
    }

    set filter(filter: string) {
      this.filterChange.next(filter);
    }

    connect(): Observable<Session[]> {
      return Observable.combineLatest(this.examples$, this.filterChange,
        (examples, filter) =>  examples.filter((item: Session) =>
          (item.sessionName).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        ).map((sess:Session) => new DisplaySession(sess))
      );
    }

    disconnect(): void {
    }
  }
