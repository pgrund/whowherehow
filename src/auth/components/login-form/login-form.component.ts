import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

import { Player } from "@shared/models/player";
import { Login } from "../..//models/login";

import { environment } from "@env/environment";

@Component({
  selector: "cluedo-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  @Input() me: Player = null;
  @Output() login = new EventEmitter<Login>();

  public form: FormGroup = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
      //    Validators.pattern(/^[a-zA-Z0-9\:_\-\!#\*]*$/)
    ]),
    password: new FormControl("", [
      Validators.required
      //Validators.pattern( /^(?:(http|ws)s?\:\/\/)?w+(?:\.\w{2,4})*(?:\:\d+)?$/)
    ]),
    returnUrl: new FormControl("")
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.patchValue({ name: this.me ? this.me.name : "" });
  }
}
