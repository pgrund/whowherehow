import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

import { Player } from '@shared/models/player';

import { Login } from '../../models/login';

import { environment } from '@env/environment';

@Component({
  selector: 'cluedo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;

  constructor(private store: Store<fromStore.AuthState>) {}

  ngOnInit() {
    // let myself = this.me.getMe();
  }

  login(loginData: Login) {
    this.store.dispatch(new fromStore.LoginAction(loginData));
  }
}
