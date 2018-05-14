import { getMyGame } from './../../../auth/store/reducers/index';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthState, getMyInfo } from '@auth/store';

import { Session } from '@shared/models/session';
import { Player } from '@shared/models/player';

@Component({
  selector: 'cluedo-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  formGroup: FormGroup;
  isNonLinear = false;
  isNonEditable = false;

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  me$: Observable<Player>;
  game$: Observable<Session>;

  steps = [
    { label: 'Confirm your name', content: 'Last name, First name.' },
    { label: 'Confirm your contact information', content: '123-456-7890' },
    { label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV' },
    { label: 'You are now done', content: 'Finished!' }
  ];

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {
    this.me$ = this.store.select(getMyInfo);
    this.game$ = this.store.select(getMyGame);
  }

  getMyCards() {
    // return this.info$.map(
    //   i => (i.myself.cards ? i.myself.cards.map(c => c.id) : [])
    // );
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstNameFormCtrl: ['', Validators.required],
          lastNameFormCtrl: ['', Validators.required]
        }),
        this._formBuilder.group({
          emailFormCtrl: ['', Validators.email]
        })
      ])
    });

    this.nameFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required]
    });

    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.email]
    });
  }
}
