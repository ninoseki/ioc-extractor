import { Pool, spawn, Worker } from "threads";
import { QueuedTask } from "threads/dist/master/pool";
import { ModuleThread } from "threads/dist/types/master";

import { refang } from "./aux/auxiliary";
import {
  extractASN,
  extractASNs,
  extractBTC,
  extractBTCs,
  extractCVE,
  extractCVEs,
  extractDomain,
  extractDomains,
  extractEmail,
  extractEmails,
  extractETH,
  extractETHs,
  extractGAPubID,
  extractGAPubIDs,
  extractGATrackID,
  extractGATrackIDs,
  extractIPv4,
  extractIPv4s,
  extractIPv6,
  extractIPv6s,
  extractMacAddress,
  extractMacAddresses,
  extractMD5,
  extractMD5s,
  extractSHA1,
  extractSHA1s,
  extractSHA256,
  extractSHA256s,
  extractSHA512,
  extractSHA512s,
  extractSSDEEP,
  extractSSDEEPs,
  extractURL,
  extractURLs,
  extractXMR,
  extractXMRs,
} from "./aux/extractor";
import { convertToSTIX2, STIX2 } from "./stix2/stix2";
import { IOC, Options } from "./types";
import { Extractor } from "./workers/extractor";

export {
  extractASN,
  extractASNs,
  extractBTC,
  extractBTCs,
  extractCVE,
  extractCVEs,
  extractDomain,
  extractDomains,
  extractEmail,
  extractEmails,
  extractETH,
  extractETHs,
  extractGAPubID,
  extractGAPubIDs,
  extractGATrackID,
  extractGATrackIDs,
  extractIPv4,
  extractIPv4s,
  extractIPv6,
  extractIPv6s,
  extractMacAddress,
  extractMacAddresses,
  extractMD5,
  extractMD5s,
  extractSHA1,
  extractSHA1s,
  extractSHA256,
  extractSHA256s,
  extractSHA512,
  extractSHA512s,
  extractSSDEEP,
  extractSSDEEPs,
  extractURL,
  extractURLs,
  extractXMR,
  extractXMRs,
  IOC,
  Options,
  refang,
};

export class IOCExtractor {
  /**
   * Returns an IOC in data
   *
   * @static
   * @param {string} data A string
   * @param {Options} options
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public static extractIOC(
    data: string,
    options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
  ): IOC {
    const extractor = new IOCExtractor(data);
    return extractor.extractIOC(options);
  }

  /**
   * Returns an IOC in data in async
   *
   * @static
   * @param {string} data A string
   * @param {Options} options
   * @returns {Promise<IOC>}
   * @memberof IOCExtractor
   */
  public static async extractIOCAsync(
    data: string,
    options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
  ): Promise<IOC> {
    const extractor = new IOCExtractor(data);
    return await extractor.extractIOCAsync(options);
  }

  private data: string;

  public constructor(data: string) {
    this.data = data;
  }

  /**
   * Returns an IOC of the data
   *
   * @returns {IOC}
   * @param {Options} options
   * @memberof IOCExtractor
   */
  public extractIOC(
    options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
  ): IOC {
    const normalizedData = options.enableRefang ? refang(this.data) : this.data;
    const ioc: IOC = {
      asns: extractASNs(normalizedData),
      btcs: extractBTCs(normalizedData),
      cves: extractCVEs(normalizedData),
      domains: extractDomains(normalizedData, options),
      emails: extractEmails(normalizedData, options),
      eths: extractETHs(normalizedData),
      gaPubIDs: extractGAPubIDs(normalizedData),
      gaTrackIDs: extractGATrackIDs(normalizedData),
      ipv4s: extractIPv4s(normalizedData),
      ipv6s: extractIPv6s(normalizedData),
      macAddresses: extractMacAddresses(normalizedData),
      md5s: extractMD5s(normalizedData),
      sha1s: extractSHA1s(normalizedData),
      sha256s: extractSHA256s(normalizedData),
      sha512s: extractSHA512s(normalizedData),
      ssdeeps: extractSSDEEPs(normalizedData),
      urls: extractURLs(normalizedData, options),
      xmrs: extractXMRs(normalizedData),
    };
    return ioc;
  }

  /* eslint-disable @typescript-eslint/no-unsafe-argument */

  /**
   * Returns an IOC of the data in async
   *
   * @returns {Promise<IOC>}
   * @param {Options} options
   * @memberof IOCExtractor
   */
  public async extractIOCAsync(
    options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
  ): Promise<IOC> {
    const pool = Pool(() =>
      spawn<Extractor>(new Worker("./workers/extractor"))
    );
    const tasks: QueuedTask<ModuleThread<Extractor>, string[]>[] = [];

    const normalizedData = options.enableRefang ? refang(this.data) : this.data;

    const extractASNTask = pool.queue((extractor) =>
      extractor.extractASNs(normalizedData)
    );
    tasks.push(extractASNTask);

    const extractBTCTask = pool.queue((extractor) =>
      extractor.extractBTCs(normalizedData)
    );
    tasks.push(extractBTCTask);

    const extractCVETask = pool.queue((extractor) =>
      extractor.extractCVEs(normalizedData)
    );
    tasks.push(extractCVETask);

    const extractDomainTask = pool.queue((extractor) =>
      extractor.extractDomains(normalizedData, options)
    );
    tasks.push(extractDomainTask);

    const extractEmailTask = pool.queue((extractor) =>
      extractor.extractEmails(normalizedData, options)
    );
    tasks.push(extractEmailTask);

    const extractETHTask = pool.queue((extractor) =>
      extractor.extractETHs(normalizedData)
    );
    tasks.push(extractETHTask);

    const extractGAPubIDTask = pool.queue((extractor) =>
      extractor.extractGAPubIDs(normalizedData)
    );
    tasks.push(extractGAPubIDTask);

    const extractGATrackIDTask = pool.queue((extractor) =>
      extractor.extractGATrackIDs(normalizedData)
    );
    tasks.push(extractGATrackIDTask);

    const extractIPv4Task = pool.queue((extractor) =>
      extractor.extractIPv4s(normalizedData)
    );
    tasks.push(extractIPv4Task);

    const extractIPv6Task = pool.queue((extractor) =>
      extractor.extractIPv6s(normalizedData)
    );
    tasks.push(extractIPv6Task);

    const extractMacAddressTask = pool.queue((extractor) =>
      extractor.extractMacAddresses(normalizedData)
    );
    tasks.push(extractMacAddressTask);

    const extractMD5Task = pool.queue((extractor) =>
      extractor.extractMD5s(normalizedData)
    );
    tasks.push(extractMD5Task);

    const extractSHA1Task = pool.queue((extractor) =>
      extractor.extractSHA1s(normalizedData)
    );
    tasks.push(extractSHA1Task);

    const extractSHA256Task = pool.queue((extractor) =>
      extractor.extractSHA256s(normalizedData)
    );
    tasks.push(extractSHA256Task);

    const extractSHA512Task = pool.queue((extractor) =>
      extractor.extractSHA512s(normalizedData)
    );
    tasks.push(extractSHA512Task);

    const extractSSDEEPTask = pool.queue((extractor) =>
      extractor.extractSSDEEPs(normalizedData)
    );
    tasks.push(extractSSDEEPTask);

    const extractURLTask = pool.queue((extractor) =>
      extractor.extractURLs(normalizedData, options)
    );
    tasks.push(extractURLTask);

    const extractXMRTask = pool.queue((extractor) =>
      extractor.extractXMRs(normalizedData)
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
      eths: results[5],
      gaPubIDs: results[6],
      gaTrackIDs: results[7],
      ipv4s: results[8],
      ipv6s: results[9],
      macAddresses: results[10],
      md5s: results[11],
      sha1s: results[12],
      sha256s: results[13],
      sha512s: results[14],
      ssdeeps: results[15],
      urls: results[16],
      xmrs: results[17],
    };

    return ioc;
  }

  /* eslint-enable @typescript-eslint/no-unsafe-argument */
}

/**
 * Returns an IOC of data
 *
 * @export
 * @param {string} data A string
 * @param {Options} options
 * @returns {IOC}
 */
export function extractIOC(
  data: string,
  options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
): IOC {
  return IOCExtractor.extractIOC(data, options);
}

/**
 * Returns an IOC of data in async
 *
 * @export
 * @param {string} data A string
 * @param {Options} options
 * @returns {Promise<IOC>}
 */
export async function extractIOCAsync(
  data: string,
  options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
): Promise<IOC> {
  return await IOCExtractor.extractIOCAsync(data, options);
}

/**
 * Returns an IOC of data as STIX2 format
 *
 * @export
 * @param {string} data
 * @param {Options} options
 * @returns {STIX2}
 */
export function extractSTIX2(
  data: string,
  options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
): STIX2 {
  const ioc = extractIOC(data, options);
  return convertToSTIX2(ioc);
}

/**
 * Returns an IOC of data as STIX2 format in async
 *
 * @export
 * @param {string} data
 * @param {Options} options
 * @returns {Promise<STIX2>}
 */
export async function extractSTIX2Async(
  data: string,
  options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
): Promise<STIX2> {
  const ioc = await extractIOCAsync(data, options);
  return convertToSTIX2(ioc);
}
