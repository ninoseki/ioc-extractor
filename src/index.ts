import { clean, dedup } from './aux/auxiliary';
import { fileRegexs, hashRegexs, networkRegexs, utilityRegexs } from './aux/regexs';

export declare interface Hashes {
  md5s: string[] | null;
  sha1s: string[] | null;
  sha256s: string[] | null;
  sha512s: string[] | null;
  ssdeeps: string[] | null;
}

export declare interface Networks {
  domains: string[] | null;
  emails: string[] | null;
  ipv4s: string[] | null;
  ipv6s: string[] | null;
  urls: string[] | null;
}

export declare interface Files {
  docs: string[] | null;
  exes: string[] | null;
  flashes: string[] | null;
  imgs: string[] | null;
  macs: string[] | null;
  webs: string[] | null;
  zips: string[] | null;
}

export declare interface Utilities {
  cves: string[] | null;
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
    this.data = data;
  }

  public getHashes(): Hashes {
    const data = dedup(this.data);
    const hashes: Hashes = {
      md5s: data.match(hashRegexs.md5),
      sha1s: data.match(hashRegexs.sha1),
      sha256s: data.match(hashRegexs.sha256),
      sha512s: data.match(hashRegexs.sha512),
      ssdeeps: data.match(hashRegexs.ssdeep),
    };
    return hashes;
  }

  public getNetworks(): Networks {
    const data = dedup(clean(this.data));
    const networks: Networks = {
      domains: data.match(networkRegexs.domain),
      emails: data.match(networkRegexs.email),
      ipv4s: data.match(networkRegexs.ipv4),
      ipv6s: data.match(networkRegexs.ipv6),
      urls: data.match(networkRegexs.url),
    };
    return networks;
  }

  public getFiles(): Files {
    const data = dedup(this.data);
    const files: Files = {
      docs: data.match(fileRegexs.doc),
      exes: data.match(fileRegexs.exe),
      flashes: data.match(fileRegexs.flash),
      imgs: data.match(fileRegexs.img),
      macs: data.match(fileRegexs.mac),
      webs: data.match(fileRegexs.web),
      zips: data.match(fileRegexs.zip),
    };
    return files;
  }

  public getUtilities(): Utilities {
    const data = dedup(this.data);
    const utilities: Utilities = {
      cves: data.match(utilityRegexs.cve),
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
}

export function getIOC(data: string): IOC {
  return IOCExtractor.getIOC(data);
}
