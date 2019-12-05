import * as tlds from "tlds";
import * as punycode from "punycode";

const asciiTlds = tlds.map(tld => punycode.toASCII(tld));

export const tldRegexString: string = asciiTlds.join("|");
