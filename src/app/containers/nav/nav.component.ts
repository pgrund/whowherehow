import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

// import { State } from '../../store';
import * as fromStore from '@auth/store';

import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { LogoutAction } from '@auth/store';

import { MySelfService } from '@app/services/my-self.service';

import { environment } from '@env/environment';
import { Player } from '@shared/models/player';

@Component({
  selector: 'cluedo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public returnUrl = '/';
  public debug: boolean;

  public myself$: Observable<Player>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.AuthState>,
    public myService: MySelfService,
    private translation: TranslateService
  ) {
    console.log(store);
    this.debug = !environment.production;
    this.translation.setDefaultLang('en');

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
