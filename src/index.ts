import { Pool, spawn, Worker } from "threads";
import { QueuedTask } from "threads/dist/master/pool";
import { ModuleThread } from "threads/dist/types/master";

import { refang } from "./aux/auxiliary";
import {
  extractASN,
  extractBTC,
  extractCVE,
  extractDomain,
  extractEmail,
  extractGAPubID,
  extractGATrackID,
  extractIPv4,
  extractIPv6,
  extractMacAddress,
  extractMD5,
  extractSHA1,
  extractSHA256,
  extractSHA512,
  extractSSDEEP,
  extractURL,
  extractXMR,
} from "./aux/extractor";
import { convertToSTIX2, STIX2 } from "./stix2/stix2";
import { Extractor } from "./workers/extractor";

export {
  refang,
  extractASN,
  extractBTC,
  extractCVE,
  extractDomain,
  extractEmail,
  extractGAPubID,
  extractGATrackID,
  extractIPv4,
  extractIPv6,
  extractMacAddress,
  extractMD5,
  extractSHA1,
  extractSHA256,
  extractSHA512,
  extractSSDEEP,
  extractURL,
  extractXMR,
};

export declare interface IOC {
  asns: string[];
  btcs: string[];
  cves: string[];
  domains: string[];
  emails: string[];
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

export class IOCExtractor {
  /**
   * Returns an IOC in data
   *
   * @static
   * @param {string} data A string
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public static extractIOC(data: string): IOC {
    const extractor = new IOCExtractor(data);
    return extractor.extractIOC();
  }

  /**
   * Returns an IOC in data in async
   *
   * @static
   * @param {string} data A string
   * @returns {Promise<IOC>}
   * @memberof IOCExtractor
   */
  public static async extractIOCAsync(data: string): Promise<IOC> {
    const extractor = new IOCExtractor(data);
    return await extractor.extractIOCAsync();
  }

  /**
   * Alias for extractIOC
   *
   * @deprecated
   * @static
   * @param {string} data
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public static getIOC(data: string): IOC {
    return this.extractIOC(data);
  }

  private data: string;

  public constructor(data: string) {
    this.data = refang(data);
  }

  /**
   * Returns an IOC of the data
   *
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public extractIOC(): IOC {
    const ioc: IOC = {
      asns: extractASN(this.data),
      btcs: extractBTC(this.data),
      cves: extractCVE(this.data),
      domains: extractDomain(this.data),
      emails: extractEmail(this.data),
      gaPubIDs: extractGAPubID(this.data),
      gaTrackIDs: extractGATrackID(this.data),
      ipv4s: extractIPv4(this.data),
      ipv6s: extractIPv6(this.data),
      macAddresses: extractMacAddress(this.data),
      md5s: extractMD5(this.data),
      sha1s: extractSHA1(this.data),
      sha256s: extractSHA256(this.data),
      sha512s: extractSHA512(this.data),
      ssdeeps: extractSSDEEP(this.data),
      urls: extractURL(this.data),
      xmrs: extractXMR(this.data),
    };
    return ioc;
  }

  /**
   * Returns an IOC of the data in async
   *
   * @returns {Promise<IOC>}
   * @memberof IOCExtractor
   */
  public async extractIOCAsync(): Promise<IOC> {
    const pool = Pool(() =>
      spawn<Extractor>(new Worker("./workers/extractor"))
    );
    const tasks: QueuedTask<ModuleThread<Extractor>, string[]>[] = [];

    const extractASNTask = pool.queue((extractor) =>
      extractor.extractASN(this.data)
    );
    tasks.push(extractASNTask);

    const extractBTCTask = pool.queue((extractor) =>
      extractor.extractBTC(this.data)
    );
    tasks.push(extractBTCTask);

    const extractCVETask = pool.queue((extractor) =>
      extractor.extractCVE(this.data)
    );
    tasks.push(extractCVETask);

    const extractDomainTask = pool.queue((extractor) =>
      extractor.extractDomain(this.data)
    );
    tasks.push(extractDomainTask);

    const extractEmailTask = pool.queue((extractor) =>
      extractor.extractEmail(this.data)
    );
    tasks.push(extractEmailTask);

    const extractGAPubIDTask = pool.queue((extractor) =>
      extractor.extractGAPubID(this.data)
    );
    tasks.push(extractGAPubIDTask);

    const extractGATrackIDTask = pool.queue((extractor) =>
      extractor.extractGATrackID(this.data)
    );
    tasks.push(extractGATrackIDTask);

    const extractIPv4Task = pool.queue((extractor) =>
      extractor.extractIPv4(this.data)
    );
    tasks.push(extractIPv4Task);

    const extractIPv6Task = pool.queue((extractor) =>
      extractor.extractIPv6(this.data)
    );
    tasks.push(extractIPv6Task);

    const extractMacAddressTask = pool.queue((extractor) =>
      extractor.extractMacAddress(this.data)
    );
    tasks.push(extractMacAddressTask);

    const extractMD5Task = pool.queue((extractor) =>
      extractor.extractMD5(this.data)
    );
    tasks.push(extractMD5Task);

    const extractSHA1Task = pool.queue((extractor) =>
      extractor.extractSHA1(this.data)
    );
    tasks.push(extractSHA1Task);

    const extractSHA256Task = pool.queue((extractor) =>
      extractor.extractSHA256(this.data)
    );
    tasks.push(extractSHA256Task);

    const extractSHA512Task = pool.queue((extractor) =>
      extractor.extractSHA512(this.data)
    );
    tasks.push(extractSHA512Task);

    const extractSSDEEPTask = pool.queue((extractor) =>
      extractor.extractSSDEEP(this.data)
    );
    tasks.push(extractSSDEEPTask);

    const extractURLTask = pool.queue((extractor) =>
      extractor.extractURL(this.data)
    );
    tasks.push(extractURLTask);

    const extractXMRTask = pool.queue((extractor) =>
      extractor.extractXMR(this.data)
    );
    tasks.push(extractXMRTask);

    const results = await Promise.all(tasks);
    await pool.terminate();

    const ioc: IOC = {
      asns: results[0],
      btcs: results[1],
      cves: results[2],
      domains: results[3],
      emails: results[4],
      gaPubIDs: results[5],
      gaTrackIDs: results[6],
      ipv4s: results[7],
      ipv6s: results[8],
      macAddresses: results[9],
      md5s: results[10],
      sha1s: results[11],
      sha256s: results[12],
      sha512s: results[13],
      ssdeeps: results[14],
      urls: results[15],
      xmrs: results[16],
    };

    return ioc;
  }

  /**
   * Alias for getIOC
   * @deprecated
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public getIOC(): IOC {
    return this.extractIOC();
  }
}

/**
 * Retuerns an IOC of data
 *
 * @export
 * @param {string} data A string
 * @returns {IOC}
 */
export function extractIOC(data: string): IOC {
  return IOCExtractor.extractIOC(data);
}

/**
 * Retuerns an IOC of data in async
 *
 * @export
 * @param {string} data A string
 * @returns {Promise<IOC>}
 */
export async function extractIOCAsync(data: string): Promise<IOC> {
  return await IOCExtractor.extractIOCAsync(data);
}

/**
 * Alias for extractIOC
 * @deprecated
 * @export
 * @param {string} data A string
 * @returns {IOC}
 */
export function getIOC(data: string): IOC {
  return extractIOC(data);
}

/**
 * Returns an IOC of data as STIX2 format
 *
 * @export
 * @param {string} data
 * @returns {STIX2}
 */
export function extractSTIX2(data: string): STIX2 {
  const ioc = extractIOC(data);
  return convertToSTIX2(ioc);
}

/**
 * Returns an IOC of data as STIX2 format in async
 *
 * @export
 * @param {string} data
 * @returns {Promise<STIX2>}
 */
export async function extractSTIX2Async(data: string): Promise<STIX2> {
  const ioc = await extractIOCAsync(data);
  return convertToSTIX2(ioc);
}

/**
 * Alias for extractSTIX2
 * @deprecated
 * @export
 * @param {string} data
 * @returns {STIX2}
 */
export function getSTIX2(data: string): STIX2 {
  return extractSTIX2(data);
}
