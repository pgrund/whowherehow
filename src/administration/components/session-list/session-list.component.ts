import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, Subscription, BehaviorSubject } from "rxjs";

import { DataSource } from "@angular/cdk/collections";

import { Session, SessionState } from "@app/models/session";
import { Player } from "@app/models/player";
import { HalLinks, HalLink } from "@app/models/hal";

import * as fromStore from "../../store";

import { environment } from "@env/environment";

class DisplaySession extends Session {
  state: SessionState;
  playerLinks: HalLink[];
  actions: HalLinks = { self: null };
  activePlayer: HalLink;

  constructor(private session: Session) {
    super();
    Object.keys(session).forEach(key => {
      this[key] = session[key];
    });
    // this._links = session._links;
    this.playerLinks = session._links.players;
    this.activePlayer = session._links.active;
    this.state = session._links.close ? SessionState.OPEN : SessionState.CLOSED;

    Object.keys(session._links)
      .filter(key => ["self", "turn", "start"].indexOf(key) > -1)
      .forEach(key => (this.actions[key] = session._links[key]));
  }
}

@Component({
  selector: "cluedo-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"]
})
export class SessionListComponent implements OnInit {
  @Input() sessions: Observable<Session[]> = Observable.of([]);
  @Input() me: Player = new Player();

  @Output() closeSession = new EventEmitter<Session>();
  @Output() joinSession = new EventEmitter<Session>();
  @Output()
  kickoutSession = new EventEmitter<{
    session: string;
    player: string;
  }>();
  @Output() createSession = new EventEmitter<string>();

  public displayedColumns = ["sessionName", "playerLinks", "_links", "actions"];
  public dataSource: SessionListDataSource;
  public debug = !environment.production;

  ngOnInit() {
    this.dataSource = new SessionListDataSource(this.sessions);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  partOfGame(session: Session, link: HalLink = this.me._links.self): boolean {
    return session._links.players.find(p => p.href == link.href) != null;
  }

  amAdmin(session: Session, playerLink: HalLink = this.me._links.self) {
    return playerLink.href == session._links.admin.href;
  }

  test(session: Session) {
    this.closeSession.emit(session);
  }
  log(str: any) {
    console.log(str);
  }

  constructor() {}
}

export class SessionListDataSource extends DataSource<DisplaySession> {
  filterChange = new BehaviorSubject("");
  constructor(private examples$: Observable<Session[]>) {
    super();
  }

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  connect(): Observable<DisplaySession[]> {
    return Observable.combineLatest(
      this.examples$,
      this.filterChange,
      (examples, filter) =>
        examples
          .filter(
            (item: Session) =>
              item.sessionName
                .toLowerCase()
                .indexOf(this.filter.toLowerCase()) !== -1
          )
          .map((sess: Session) => new DisplaySession(sess))
    );
  }

  disconnect(): void {}
}
