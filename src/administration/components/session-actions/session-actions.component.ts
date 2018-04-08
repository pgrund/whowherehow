import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '@shared/models/session';
import { Player } from '@shared/models/player';

@Component({
  selector: 'cluedo-session-actions',
  templateUrl: './session-actions.component.html',
  styles: ['']
})
export class SessionActionsComponent {
  @Input() element: Session;
  @Input() me: Player = null;

  @Output() join = new EventEmitter<Session>();
  @Output() close = new EventEmitter<Session>();

  partOfGame(session: Session) {
    return (
      this.me &&
      this.me._links.game &&
      this.me._links.game.href === session._links.self.href
    );
  }

  amAdmin(session: Session) {
    return (
      this.me &&
      this.me._links.admin &&
      this.me._links.admin.href === session._links.self.href
    );
  }
}
