import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, getSessions } from '@app/reducers';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { Session } from '@app/model/session';

@Component({
  selector: 'cluedo-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {

  public session$: Observable<Session>;
  public sessionId: number;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private store:Store<State>) {}

  ngOnInit() {
    this.sessionId = +this.route.snapshot.paramMap.get('sid');
    this.session$ = this.store.select(getSessions)
      .map(list => list.find(obj => obj._links.self.href.endsWith(`/${this.sessionId}`)) || null);

  }


}
