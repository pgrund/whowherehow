import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getSessions, getMyInfo } from '@app/reducers';

import { Observable, Subscription } from 'rxjs';

import { Session } from '@app/model/session';
@Component({
  selector: 'cluedo-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  objectKeys = Object.keys;
  displayedColumns = ['sessionName', '_links'];
  //dataSource = new SessionListDataSource(this.store.select(getSessions));
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
