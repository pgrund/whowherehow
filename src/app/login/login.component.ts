import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';

import { Store } from '@ngrx/store';
import { LoginRequestAction, PingRequestAction } from '../actions/login';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cluedo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;

  loginForm:FormGroup = new FormGroup({
    'user': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
  //    Validators.pattern(/^[a-zA-Z0-9\:_\-\!#\*]*$/)
      ])
   ,
    'server': new FormControl('', [
      Validators.required ,
      //Validators.pattern( /^(?:(http|ws)s?\:\/\/)?\w+(?:\.\w{2,4})*(?:\:\d+)?$/)
    ])
  });

  public id:string = "";
  public checkedServer:boolean;

//  public server: {host:string, validated: boolean};

  constructor(private store:Store<{config:any}>, private fb:FormBuilder) {
    this.subscription = this.store.select('config').subscribe( data => {
      this.id = data.user;
      console.log(data, this.loginForm);
      this.loginForm.setValue({
          user: data.user,
          server: data.server.host
      });
      this.checkedServer = data.server.validated;
    })
  }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.value)
    this.store.dispatch(new LoginRequestAction(this.loginForm.value));
  }

  pingServer() {
    console.log(this.loginForm);
    this.store.dispatch(new PingRequestAction(this.loginForm.controls['server'].value));
  }
}
