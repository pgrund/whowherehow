import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getMyInfo } from '@app/reducers';

import { Subscription } from 'rxjs';


import { Player } from '@app/model/player';

@Component({
  selector: 'cluedo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mySelf: Player;
  private subscription: Subscription;

  constructor(private store:Store<State>) {
    this.subscription = this.store.select(getMyInfo).subscribe( me => {
      console.log('myself got updated', me);
      this.mySelf = me;
    });
  }

  logout() {
    console.log('logout ...');
  }
}
