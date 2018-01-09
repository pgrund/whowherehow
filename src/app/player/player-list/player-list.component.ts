import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, getPlayers, getMyInfo } from '@app/reducers';

import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';

// import { MatTableDataSource } from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import { Player } from '@app/model/player';

@Component({
  selector: 'cluedo-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  objectKeys = Object.keys;
  displayedColumns = ['name', '_links'];
  dataSource = new PlayerListDataSource(this.store.select(getPlayers));
  me = '';

  private subscription:Subscription;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private store:Store<State>) {
    this.subscription = this.store.select(getMyInfo).subscribe( myself => {
      this.me = myself ? myself.name : '';
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

export class PlayerListDataSource extends DataSource<Player> {

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

    connect(): Observable<Player[]> {
      return Observable.combineLatest(this.examples$, this.filterChange,
        (examples, filter) =>  examples.filter((item: Player) =>
          (item.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
          )
      );
    }

    disconnect(): void {
    }
  }
