import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

import { Player } from '@shared/models/player';

import { environment } from '@env/environment';

@Component({
  selector: 'cluedo-session-new',
  templateUrl: './session-new.component.html',
  styleUrls: ['./session-new.component.css']
})
export class SessionNewComponent implements OnInit {
  @Output() createSession = new EventEmitter<string>();

  public name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  constructor(private store: Store<fromStore.AdministrationState>) {}

  ngOnInit() {}

  create() {
    console.log(this.name.valid, this.name.value);
    if (this.name.valid) {
      // this.store.dispatch(new fromStore.CreateSessionAction(this.name.value));
      this.createSession.emit(this.name.value);
    }
  }
}
