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

  form:FormGroup = new FormGroup({
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

  public id:string = "";
  public checkedServer:boolean;

//  public server: {host:string, validated: boolean};

  constructor(private store:Store<{users:any}>, private fb:FormBuilder) {
    this.subscription = this.store.select('users').subscribe( data => {
      console.log('data', data, this.form);

        // this.id = data.user;
        // this.form.setValue({
        //     user: data.user
        // });

    })
  }

  ngOnInit() {
  }

  login() {
    console.log(this.form.value)
    this.store.dispatch(new LoginRequestAction(this.form.value));
  }
}
