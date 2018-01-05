import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoginRequestAction, ReLoginRequestAction } from '@app/actions/login.actions';
import { Go } from '@app/actions/router.actions';
import { getMyInfo, State } from '@app/reducers';


import { Player } from '@app/model/player';

@Component({
  selector: 'cluedo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public me:Player;

  private subscription:Subscription;
  private returnUrl = '/';

  public form:FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
  //    Validators.pattern(/^[a-zA-Z0-9\:_\-\!#\*]*$/)
      ])
   ,
    'password': new FormControl('', [
      Validators.required ,
      //Validators.pattern( /^(?:(http|ws)s?\:\/\/)?\w+(?:\.\w{2,4})*(?:\:\d+)?$/)
    ])
  });


  constructor(private store:Store<State>, private fb:FormBuilder,
    private router: Router, private route: ActivatedRoute) {
    this.subscription = this.store.select(getMyInfo).subscribe( (myself:Player) => {
      this.me = myself;
    });
    this.route.queryParams.subscribe(params => {
      console.log('login params',params);
      this.returnUrl = params['returnUrl'] || '/';
    })
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reLogin() {
    this.store.dispatch(new ReLoginRequestAction(this.me));
  }
  login() {
    this.store.dispatch(new LoginRequestAction( { ...this.form.value, returnUrl: this.returnUrl }));
  }
  test() {
    this.store.dispatch( new Go({ path:['info', 'players']}))
  }

}
