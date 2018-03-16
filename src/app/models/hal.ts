export type HalLink = {
  href: string;
  templated?: boolean;
  title?: string;
  name?: string;
};
export interface HalLinks {
  self: HalLink;
  players?: HalLink[];
  admin?: HalLink;
  game?: HalLink;
  close?: HalLink;
  join?: HalLink;
  approve?: HalLink;
  turn?: HalLink;
  active?: HalLink;
}
export class Hal {
  _links: HalLinks;
  constructor() {
    this._links = <HalLinks>{ self: { href: null } };
  }
}
