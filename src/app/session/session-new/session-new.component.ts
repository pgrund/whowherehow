import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { CreateSessionAction } from '@app/actions/sessions.actions';
import { State } from '@app/reducers';

import { Player } from '@app/model/player';

import { environment } from '@env/environment';

@Component({
  selector: 'cluedo-session-new',
  templateUrl: './session-new.component.html',
  styleUrls: ['./session-new.component.css']
})
export class SessionNewComponent implements OnInit {

  public name =  new FormControl( '', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);

  constructor(private store:Store<State>, private fb:FormBuilder) {}

  ngOnInit() {}

  create() {
    console.log(this.name.valid, this.name.value);
    if(this.name.valid){
      this.store.dispatch(new CreateSessionAction(this.name.value));
    }
  }

}
