import { Component, Input } from '@angular/core';

import { Card } from '@shared/models/card';
@Component({
  selector: 'cluedo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;
  @Input() disabled = false;

  constructor() {}
}
