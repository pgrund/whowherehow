import { Component, Input } from '@angular/core';
import { Session } from '@shared/models/session';
import { Player } from '@shared/models/player';

@Component({
  selector: 'cluedo-session-links',
  template: './session.links.component.html',
  styles: ['']
})
export class SessionLinksComponent {
  @Input() element: Session;
  @Input() me: Player = null;

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
