import { clean, dedup } from './aux/auxiliary';
import { fileRegexs, hashRegexs, networkRegexs, utilityRegexs } from './aux/regexs';

declare interface Hashes {
  md5: string[] | null;
  sha1: string[] | null;
  sha256: string[] | null;
  sha512: string[] | null;
  ssdeep: string[] | null;
}

declare interface Networks {
  domain: string[] | null;
  email: string[] | null;
  ipv4: string[] | null;
  ipv6: string[] | null;
  url: string[] | null;
}

declare interface Files {
  doc: string[] | null;
  exe: string[] | null;
  flash: string[] | null;
  img: string[] | null;
  mac: string[] | null;
  web: string[] | null;
  zip: string[] | null;
}

declare interface Utilities {
  cve: string[] | null;
}

declare interface IOC {
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
      md5: data.match(hashRegexs.md5),
      sha1: data.match(hashRegexs.sha1),
      sha256: data.match(hashRegexs.sha256),
      sha512: data.match(hashRegexs.sha512),
      ssdeep: data.match(hashRegexs.ssdeep),
    };
    return hashes;
  }

  public getNetworks(): Networks {
    const data = dedup(clean(this.data));
    const networks: Networks = {
      domain: data.match(networkRegexs.domain),
      email: data.match(networkRegexs.email),
      ipv4: data.match(networkRegexs.ipv4),
      ipv6: data.match(networkRegexs.ipv6),
      url: data.match(networkRegexs.url),
    };
    return networks;
  }

  public getFiles(): Files {
    const data = dedup(this.data);
    const files: Files = {
      doc: data.match(fileRegexs.doc),
      exe: data.match(fileRegexs.exe),
      flash: data.match(fileRegexs.flash),
      img: data.match(fileRegexs.img),
      mac: data.match(fileRegexs.mac),
      web: data.match(fileRegexs.web),
      zip: data.match(fileRegexs.zip),
    };
    return files;
  }

  public getUtilities(): Utilities {
    const data = dedup(this.data);
    const utilities: Utilities = {
      cve: data.match(utilityRegexs.cve),
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
