import { Component, OnInit, Input } from "@angular/core";

import { Card } from "@app/models/card";

@Component({
  selector: "cluedo-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Input() disabled: string[] = [];
  constructor() {}

  ngOnInit() {}

  toggleNote(card: Card) {
    console.log(card);
  }

  isDisabled(card: Card): boolean {
    return this.disabled ? this.disabled.indexOf(card.id) > -1 : false;
  }
}
