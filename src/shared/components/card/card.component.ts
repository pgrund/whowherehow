import { Component, Input } from "@angular/core";

import { Card } from "@app/models/card";
@Component({
  selector: "cluedo-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent {
  @Input() card: Card;
  @Input() disabled: boolean = false;

  constructor() {}
}
