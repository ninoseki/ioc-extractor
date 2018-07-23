import { clean, dedup } from './aux/auxiliary';
import { fileRegexs, hashRegexs, networkRegexs, utilityRegexs } from './aux/regexs';

export declare interface Hashes {
  md5s: string[];
  sha1s: string[];
  sha256s: string[];
  sha512s: string[];
  ssdeeps: string[];
}

export declare interface Networks {
  domains: string[];
  emails: string[];
  ipv4s: string[];
  ipv6s: string[];
  urls: string[];
}

export declare interface Files {
  docs: string[];
  exes: string[];
  flashes: string[];
  imgs: string[];
  macs: string[];
  webs: string[];
  zips: string[];
}

export declare interface Utilities {
  cves: string[];
}

export declare interface IOC {
  hashes: Hashes;
  networks: Networks;
  files: Files;
  utilities: Utilities;
}

export class IOCExtractor {
  public static getIOC(data: string): IOC {
    const extractor = new IOCExtractor(data);
    return extractor.getIOC();
  }

  private data: string;

  constructor(data: string) {
    this.data = clean(data);
  }

  public getHashes(): Hashes {
    const hashes: Hashes = {
      md5s: this.matchesWithRegexp(hashRegexs.md5),
      sha1s: this.matchesWithRegexp(hashRegexs.sha1),
      sha256s: this.matchesWithRegexp(hashRegexs.sha256),
      sha512s: this.matchesWithRegexp(hashRegexs.sha512),
      ssdeeps: this.matchesWithRegexp(hashRegexs.ssdeep),
    };
    return hashes;
  }

  public getNetworks(): Networks {
    const networks: Networks = {
      domains: this.matchesWithRegexp(networkRegexs.domain),
      emails: this.matchesWithRegexp(networkRegexs.email),
      ipv4s: this.matchesWithRegexp(networkRegexs.ipv4),
      ipv6s: this.matchesWithRegexp(networkRegexs.ipv6),
      urls: this.matchesWithRegexp(networkRegexs.url),
    };
    return networks;
  }

  public getFiles(): Files {
    const files: Files = {
      docs: this.matchesWithRegexp(fileRegexs.doc),
      exes: this.matchesWithRegexp(fileRegexs.exe),
      flashes: this.matchesWithRegexp(fileRegexs.flash),
      imgs: this.matchesWithRegexp(fileRegexs.img),
      macs: this.matchesWithRegexp(fileRegexs.mac),
      webs: this.matchesWithRegexp(fileRegexs.web),
      zips: this.matchesWithRegexp(fileRegexs.zip),
    };
    return files;
  }

  public getUtilities(): Utilities {
    const utilities: Utilities = {
      cves: this.matchesWithRegexp(utilityRegexs.cve),
    };
    return utilities;
  }

  public getIOC(): IOC {
    const ioc: IOC = {
      files: this.getFiles(),
      hashes: this.getHashes(),
      networks: this.getNetworks(),
      utilities: this.getUtilities(),
    };
    return ioc;
  }

  private matchesWithRegexp(regex: RegExp): string[] {
    const matched = this.data.match(regex);
    return matched === null ? [] : dedup(matched);
  }
}

export function getIOC(data: string): IOC {
  return IOCExtractor.getIOC(data);
}
