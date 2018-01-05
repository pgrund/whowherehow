export type HalLink = {
  href: string,
  templated?: boolean
}
export interface Hal {
  _links: {
    self: HalLink,
    admin?: HalLink,
    game?: HalLink
  }
}
