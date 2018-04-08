export type CardType = 'PERSON' | 'ROOM' | 'TOOL';

export abstract class Card {
  ownerId?: number = null;
  abstract type: CardType;
  id: string;
  constructor(name: string) {
    this.id = name;
  }
}
export class PersonCard extends Card {
  static readonly all: PersonCard[] = [
    'BARONIN_VON_PORZ',
    'FRAEULEIN_GLORIA',
    'FRAU_WEISS',
    'OBERST_VON_GATOW',
    'PROFESSOR_BLOOM',
    'REVEREND_GRUEN'
  ].map(name => new PersonCard(name));
  readonly type: CardType = 'PERSON';
}
export class RoomCard extends Card {
  static readonly all: RoomCard[] = [
    'ARBEITSZIMMER',
    'BIBLIOTHEK',
    'BILLARDZIMMER',
    'HALLE',
    'KUECHE',
    'MUSIKZIMMER',
    'SALON',
    'SPEISEZIMMER',
    'WINTERGARTEN'
  ].map(name => new RoomCard(name));
  readonly type: CardType = 'ROOM';
}
export class ToolCard extends Card {
  static readonly all: ToolCard[] = [
    'DOLCH',
    'HEIZUNGSROHR',
    'LEUCHTER',
    'PISTOLE',
    'ROHRZANGE',
    'SEIL'
  ].map(name => new ToolCard(name));
  readonly type: CardType = 'TOOL';
}
export const ALL_CARDS = []
  .concat(PersonCard.all)
  .concat(RoomCard.all)
  .concat(ToolCard.all);
