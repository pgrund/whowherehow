import { Injectable } from "@angular/core";

// import @ngrx
import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";

// import rxjs
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

// import services
import { UserService } from "../services/user.service";

// import models
import { User } from "../models/user";

// import actions
import {
  ActionTypes,
  AuthenticatedErrorAction,
  AuthenticatedSuccessAction,
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  SignOutErrorAction,
  SignOutSuccessAction,
  SignUpErrorAction,
  SignUpSuccessAction
} from "./users.actions";

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class UserEffects {

  /**
   * @constructor
   * @param {Actions }actions
   * @param {UserService} userService
   */
  constructor(
    private actions: Actions,
    private userService: UserService
  ) { }

  /**
   * Authenticate user.
   */
  @Effect()
  public authenticate: Observable<Action> = this.actions.ofType(ActionTypes.AUTHENTICATE)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.authenticate(payload.email, payload.password)
        .map(user => new AuthenticationSuccessAction({ user: user }))
        .catch(error => Observable.of(new AuthenticationErrorAction({ error: error })));
    });

  /**
   * Determine if the user is authenticated.
   */
  @Effect()
  public authenticated: Observable<Action> = this.actions.ofType(ActionTypes.AUTHENTICATED)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.authenticatedUser()
        .map(user => new AuthenticatedSuccessAction({ authenticated: (user !== null), user: user }))
        .catch(error => Observable.of(new AuthenticatedErrorAction({ error: error })));
    });

  /**
   * Create a new user.
   */
  @Effect()
  public createUser: Observable<Action> = this.actions
    .ofType(ActionTypes.SIGN_UP)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.create(payload.user)
        .map(user => new SignUpSuccessAction({ user: user }))
        .catch(error => Observable.of(new SignUpErrorAction({ error: error })));
    });

  /**
   * Terminate user session.
   */
  @Effect()
  public signOut: Observable<Action> = this.actions
    .ofType(ActionTypes.SIGN_OUT)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.signout()
        .map(value => new SignOutSuccessAction())
        .catch(error => Observable.of(new SignOutErrorAction({ error: error })));
    });
}
