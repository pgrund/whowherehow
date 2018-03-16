import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Session } from "@app/models/session";
import { Player } from "@app/models/player";

@Component({
  selector: "cluedo-session-actions",
  template: `
      <button *ngIf="element._links.join && !me._links.game" mat-raised-button title="join game" [disabled]="!!me._links.game" [color]="!me._links.game ? 'accent' : 'default'" (click)="join(element)">
  join
 </button>
    <button *ngIf="element._links.close" mat-raised-button color="accent" [title]="element._links.close.title" [disabled]="!amAdmin(element)" (click)="close.emit(element)">
  close
 </button>
         <button *ngIf="element._links.turn" mat-raised-button [title]="element._links.turn.title" [disabled]="!amAdmin(element)" [color]="partOfGame(element)?'accent':'default'" [routerLink]="element._links.turn.href">
  current round
 </button>`,

  styles: [""]
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
