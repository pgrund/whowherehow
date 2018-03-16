import { Component, Input, Output } from "@angular/core";

import { Player } from "@app/models/player";

@Component({
  selector: "cluedo-player-detail",
  templateUrl: "./player-detail.component.html",
  styleUrls: ["./player-detail.component.css"]
})
export class PlayerDetailComponent {
  @Input() player: Player;
  @Input() me: Player;

  constructor() {}
}
