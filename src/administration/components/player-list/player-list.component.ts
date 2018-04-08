import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { Player, PlayerState } from '@shared/models/player';
import { HalLinks, HalLink } from '@shared/models/hal';

import { environment } from '@env/environment';

class DisplayPlayer extends Player {
  actions: HalLinks = { self: null };
  state: PlayerState = PlayerState.OPEN;

  constructor(private player: Player) {
    super();
    Object.keys(player).forEach(key => {
      this[key] = player[key];
    });

    this.state = player._links.admin
      ? PlayerState.DIRECTOR
      : player._links.game ? PlayerState.PLAYER : PlayerState.OPEN;

    Object.keys(player._links)
      .filter(key => ['self', 'turn', 'start'].indexOf(key) > -1)
      .forEach(key => (this.actions[key] = player._links[key]));
  }
}

@Component({
  selector: 'cluedo-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() players: Observable<Player[]> = Observable.of([]);
  @Input() me: Player = new Player();

  @Output() logoutPlayer = new EventEmitter<Player>();
  @Output() kickoutPlayer = new EventEmitter<Player>();
  @Output() invitePlayer = new EventEmitter<Player>();
  @Output() approvePlayer = new EventEmitter<Player>();

  objectKeys = Object.keys;
  displayedColumns = ['name', '_links', 'actions'];
  dataSource: PlayerListDataSource;

  public debug = !environment.production;

  constructor() {}

  ngOnInit() {
    this.dataSource = new PlayerListDataSource(this.players);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  isMe(player: Player | HalLink) {
    return this.me && this.me.name === player.name;
  }
  shareGame(
    gameLink: HalLink,
    link: HalLink = this.me ? this.me._links.game : null
  ) {
    return link && gameLink.href === link.href;
  }
  amAdmin() {
    return this.me && this.me._links.admin != null;
  }
  adminOfSharedGame(player: Player) {
    return (
      this.amAdmin() &&
      player._links.game &&
      this.me._links.admin.href === player._links.game.href
    );
  }

  delete(player: DisplayPlayer) {
    if (this.debug) {
      this.logoutPlayer.emit(player);
    } else {
      alert('available only in debug mode');
    }
  }

  invite(player: DisplayPlayer) {
    this.invitePlayer.emit(player);
  }

  kickOutOfSession(player: DisplayPlayer) {
    this.kickoutPlayer.emit(player);
  }

  approve(player: Player) {
    this.approvePlayer.emit(player);
  }
}

export class PlayerListDataSource extends DataSource<DisplayPlayer> {
  filterChange = new BehaviorSubject('');
  constructor(private examples$: Observable<Player[]>) {
    super();
  }

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  connect(): Observable<DisplayPlayer[]> {
    return Observable.combineLatest(
      this.examples$,
      this.filterChange,
      (examples, filter) =>
        examples
          .filter(
            (item: Player) =>
              item.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
          )
          .map((player: Player) => new DisplayPlayer(player))
          .sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  disconnect(): void {}
}
