export type HalLink = {
  href: string,
  templated?: boolean,
  title?: string,
  name?: string
}
export interface HalLinks {
  self: HalLink,
  players?: HalLink[],
  admin?: HalLink,
  game?: HalLink,
  start?: HalLink,
  join?: HalLink,
  turn?: HalLink
}
export class Hal {
  _links: HalLinks
}
