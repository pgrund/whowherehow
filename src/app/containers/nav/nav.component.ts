import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";

import { TranslateService } from "@ngx-translate/core";

import { Observable } from "rxjs";

import { LogoutAction } from "@app/store/actions/login.actions";

import { MySelfService } from "@app/services/my-self.service";

import { environment } from "@env/environment";
import { Player } from "@app/models/player";

@Component({
  selector: "cluedo-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  public returnUrl = "/";
  public debug: boolean;

  public myself$: Observable<Player>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    public myService: MySelfService,
    private translation: TranslateService
  ) {
    this.debug = !environment.production;
    this.translation.setDefaultLang("en");

    this.myself$ = this.store.select(fromStore.getMyInfo);
    this.isAuthenticated$ = this.store.select(fromStore.isAuthenticated);
  }
  ngOnInit(): void {}

  logout(me: Player) {
    this.store.dispatch(new LogoutAction());
  }

  selectLanguage(language: string): void {
    this.translation.use(language);
  }
}
