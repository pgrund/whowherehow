import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromStore from "../../store";

import { MySelfService } from "@app/services/my-self.service";

import { Player } from "@app/models/player";
import { Login } from "@app/models/login";

import { environment } from "@env/environment";

@Component({
  selector: "cluedo-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    private me: MySelfService
  ) {}

  ngOnInit() {
    let myself = this.me.getMe();
  }

  login(loginData: Login) {
    this.store.dispatch(new fromStore.LoginAction(loginData));
  }
}
