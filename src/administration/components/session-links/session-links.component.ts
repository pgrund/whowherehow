import { Component, Input } from "@angular/core";
import { Session } from "@app/models/session";
import { Player } from "@app/models/player";

@Component({
  selector: "cluedo-session-links",
  template: `<mat-chip-list>
  <mat-chip-list>
      <!-- structural links -->
      <mat-chip [routerLink]="element._links.self.href" [selected]="partOfGame(element)" title="about">about</mat-chip>
      <mat-chip [routerLink]="element._links.admin.href" color="primary" [selected]="amAdmin(element)" title="administrator of this session">director</mat-chip>
  </mat-chip-list>
</mat-chip-list>`,
  styles: [""]
})
export class SessionLinksComponent {
  @Input() element: Session;
  @Input() me: Player = null;

  partOfGame(session: Session) {
    return (
      this.me &&
      this.me._links.game &&
      this.me._links.game.href == session._links.self.href
    );
  }

  amAdmin(session: Session) {
    return (
      this.me &&
      this.me._links.admin &&
      this.me._links.admin.href == session._links.self.href
    );
  }
}
