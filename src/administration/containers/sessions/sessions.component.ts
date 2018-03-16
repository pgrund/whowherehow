import { Component } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";

import * as fromStore from "../../store";
import * as fromRoot from "@app/store";

import { Session } from "@app/models/session";
import { Player } from "@app/models/player";

@Component({
  selector: "cluedo-sessions",
  templateUrl: "./sessions.component.html"
})
export class SessionsComponent {
  public sessions$: Observable<Session[]>;
  public myself$: Observable<Player>;

  constructor(private store: Store<fromRoot.State>) {
    this.sessions$ = this.store.select(fromStore.getAllSessions);
    this.myself$ = this.store.select(fromRoot.getMyInfo);
  }

  createSession(name: string) {
    this.store.dispatch(new fromStore.CreateSessionAction(name));
  }

  joinSession(session: Session) {
    this.store.dispatch(
      new fromStore.JoinSessionAction(session._links.self.href)
    );
  }

  kickoutSession(kickout: { session: string; player: string }) {
    this.store.dispatch(new fromStore.KickOutSessionAction(kickout));
  }

  closeSession(session: Session) {
    console.log(session);
    this.store.dispatch(
      new fromStore.CloseSessionAction(session._links.close.href)
    );
  }
}
