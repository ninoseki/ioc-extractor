export type StrictOptions = Partial<{
  strict: boolean;
}>;

export type SortOptions = Partial<{
  sort: boolean;
}>;

export type StrictSortOptions = StrictOptions & SortOptions;

export type Options = StrictOptions &
  SortOptions &
  Partial<{
    refang: boolean;
    punycode: boolean;
  }>;

export interface IOC {
  asns: string[];
  btcs: string[];
  cves: string[];
  domains: string[];
  emails: string[];
  eths: string[];
  gaPubIDs: string[];
  gaTrackIDs: string[];
  ipv4s: string[];
  ipv6s: string[];
  macAddresses: string[];
  md5s: string[];
  sha1s: string[];
  sha256s: string[];
  sha512s: string[];
  ssdeeps: string[];
  urls: string[];
  xmrs: string[];
}
