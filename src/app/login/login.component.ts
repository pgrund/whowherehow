import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoginRequestAction, ReLoginRequestAction } from '@app/actions/login.actions';
import { Go } from '@app/actions/router.actions';
import { getMyInfo, State } from '@app/reducers';

import { Player } from '@app/model/player';

import { environment } from '@env/environment';

@Component({
  selector: 'cluedo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public me:Player;

  private subscription:Subscription;

  public form:FormGroup = new FormGroup({
    'name': new FormControl( this.me ? this.me.name : '', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
  //    Validators.pattern(/^[a-zA-Z0-9\:_\-\!#\*]*$/)
    ]),
    'password': new FormControl('', [
      Validators.required ,
      //Validators.pattern( /^(?:(http|ws)s?\:\/\/)?\w+(?:\.\w{2,4})*(?:\:\d+)?$/)
    ]),
    'returnUrl': new FormControl('')
  });


  constructor(private store:Store<State>, private fb:FormBuilder,
    private router: Router, private route: ActivatedRoute) {
    this.subscription = this.store.select(getMyInfo).subscribe((myself:Player) => {
      if(myself) {
        this.me = myself;
        this.form.patchValue({ name: myself.name });
      }
    });
    this.route.queryParams.subscribe(params => {
      if(params['returnUrl']) this.form.patchValue( { returnUrl: params['returnUrl'] });
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reLogin() {
    this.store.dispatch(new ReLoginRequestAction(this.me));
  }
  login() {
    let loginUser = this.form.value;
    this.store.dispatch(new LoginRequestAction(this.form.value));
  }
  test() {
    this.store.dispatch( new Go({ path:['info', 'players']}))
  }

}
