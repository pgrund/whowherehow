import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';

import "rxjs/add/observable/throw";
import "rxjs/add/operator/delay";
import { User } from "../models/user";

export const MOCK_USER = new User();
MOCK_USER._id = "1";
MOCK_USER.email = "ich";
MOCK_USER.firstName = "Foo";
MOCK_USER.lastName = "Bar";
MOCK_USER.password = "pwd";

const BASE_URL = "http://localhost:3000/api";

/**
 * The user service.
 */
@Injectable()
export class UserService {

  /**
   * True if authenticated
   * @type
   */
  private _authenticated = false;


  constructor(private http: HttpClient, private store: Store<any>){

  }
  /**
   * Authenticate the user
   *
   * @param {string} email The user's email address
   * @param {string} password The user's password
   * @returns {Observable<User>} The authenticated user observable.
   */
  public authenticate(email: string, password: string): Observable<User> {
    // Normally you would do an HTTP request to determine to
    // attempt authenticating the user using the supplied credentials.

    // this.http.
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      this._authenticated = true;
      return Observable.of(MOCK_USER);
    }

    return Observable.throw(new Error("Invalid email or password"));
  }

  /**
   * Determines if the user is authenticated
   * @returns {Observable<boolean>}
   */
  public authenticated(): Observable<boolean> {
    return Observable.of(this._authenticated);
  }

  /**
   * Returns the authenticated user
   * @returns {User}
   */
  public authenticatedUser(): Observable<User> {
    // Normally you would do an HTTP request to determine if
    // the user has an existing auth session on the server
    // but, let's just return the mock user for this example.
    return Observable.of(MOCK_USER);
  }

  /**
   * Create a new user
   * @returns {User}
   */
  public create(user: User): Observable<User> {
    // Normally you would do an HTTP request to POST the user
    // details and then return the new user object
    // but, let's just return the new user for this example.
    return this.http.post(`${BASE_URL}/users`, user)
      .catch(err => Observable.throw(new Error("cannot create user")))
      .map( user => {
        this._authenticated = true;
        return user;
      })
  }

  /**
   * End session
   * @returns {Observable<boolean>}
   */
  public signout(): Observable<boolean> {
    // Normally you would do an HTTP request sign end the session
    // but, let's just return an observable of true.
    this._authenticated = false;
    return Observable.of(true);
  }
}
