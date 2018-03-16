import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, Subscription } from "rxjs";

import { State, getMyInfo } from "../store";
import { HalLinks, HalLink } from "@app/models/hal";
import { Player } from "@app/models/player";
import { Session } from "@app/models/session";

@Injectable()
export class MySelfService {
  public mySelf: Player;
  public myGame: Session;
  private subscription: Subscription;

  constructor(private store: Store<State>) {
    this.subscription = this.store.select(getMyInfo).subscribe(info => {
      this.mySelf = info; //.me;
      //this.myGame = info.game;
    });
  }

  getMe(): Player {
    return this.mySelf;
  }
  getMySelf(): HalLink {
    return this.mySelf ? this.mySelf._links.self : null;
  }
  getMyGame(): Session {
    return this.myGame ? this.myGame : null;
  }

  isAuthenticated(): boolean {
    return this.mySelf && this.mySelf.privateId >= 0;
  }

  isDirectorOfGame(sessionLinks: HalLinks, playerLink: HalLink) {
    return sessionLinks.admin.href == playerLink.href;
  }
  isPlayerOfGame(sessionLinks: HalLinks) {
    return (
      this.mySelf &&
      this.mySelf._links.game &&
      sessionLinks.self.href == this.mySelf._links.game.href
    );
  }
  isPlayerOfAnyGame() {
    return this.mySelf && this.mySelf._links.game != null;
  }
  iAmAdminOfSharedGame(element: HalLinks) {
    return this.shareGame(element) && this.iAmAdmin();
  }
  iAmAdminOfGame(element: HalLinks) {
    return this.isPlayerOfGame(element) && this.iAmAdmin();
  }

  iAmAdmin() {
    return this.mySelf != null && this.mySelf._links.admin != null;
  }
  shareGame(playerLinks: HalLinks) {
    return (
      this.mySelf != null &&
      playerLinks.game != null &&
      this.mySelf._links.game != null &&
      this.mySelf._links.game.href == playerLinks.game.href
    );
  }
  isMe(name: string) {
    return this.mySelf && name == this.mySelf.name;
  }
  isMyGame(game: HalLink) {
    return (
      this.isPlayerOfAnyGame() && this.mySelf._links.game.href == game.href
    );
  }
}
