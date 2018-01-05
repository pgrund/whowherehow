import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getSessions, getMyInfo } from '@app/reducers';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import {DataSource} from '@angular/cdk/collections';

import { Session } from '@app/model/session';

@Component({
  selector: 'cluedo-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  objectKeys = Object.keys;
  displayedColumns = ['sessionName', '_links'];
  dataSource = new SessionListDataSource(this.store.select(getSessions));
  me = '';

  private subscription:Subscription;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.dataSource.filter = filterValue;
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
          )
      );
    }

    disconnect(): void {
    }
  }
