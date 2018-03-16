import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromStore from "../../store";

import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/map";

import { MySelfService } from "@app/services/my-self.service";
import { Session } from "@app/models/session";
import { Player } from "@app/models/player";
import { HalLink } from "@app/models/hal";

@Component({
  selector: "cluedo-session-detail",
  templateUrl: "./session-detail.component.html",
  styleUrls: ["./session-detail.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SessionDetailComponent {
  @Input() session: Session;
  @Input() me: Player;

  @Output() closeSession = new EventEmitter<Session>();

  isMe(player: HalLink) {
    return this.me && this.me.name == player.name;
  }

  iAmAdminOfGame(gameLink: HalLink) {
    return (
      this.me &&
      this.me._links.admin &&
      this.me._links.admin.href == gameLink.href
    );
  }
  step = 1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
