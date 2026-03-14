import punycode from "punycode.js";

/**
 * Reject duplications from an array
 *
 * @param {string[]} array An array of strings
 * @returns {string[]} A set of strings
 */
export function dedup(array: string[]): string[] {
  return Array.from(new Set(array));
}

/**
 * Soar an array by value
 *
 * @param {string[]} array An array of strings
 * @returns {string[]} A sorted array
 */
export function sortByValue(array: string[]): string[] {
  return array.sort();
}

const DOT_RE = new RegExp(
  [
    /\s\.\s/,
    /([[({])\.([\])}])/,
    /([[({])\./,
    /\.([\])}])/,
    /\\\./,
    /([[({])dot([\])}])/,
  ]
    .map((r) => r.source)
    .join("|"),
  "gi",
);
const COLON_RE = /[[({]:[\])}]/g;
const SLASH_RE = /[[({]\/[\])}]/g;
const COLON_SLASH_RE = /[[({]:\/\/[\])}]/g;
const AT_RE = /[[({](?:at|@)[\])}]/gi;
const HTTP_RE = /h(?:xx|\*\*)p(s?):\/\//gi;

function hasDot(s: string): boolean {
  return ["\\.", " . ", "[.", "(.", "{.", "[dot", "(dot", "{dot"].some((x) =>
    s.includes(x),
  );
}

function hasColon(s: string): boolean {
  return ["[:", "(:", "{:"].some((x) => s.includes(x));
}

function hasSlash(s: string): boolean {
  return ["[/", "(/", "{/"].some((x) => s.includes(x));
}

function hasColonDoubleSlash(s: string): boolean {
  return ["[://", "(://", "{://"].some((x) => s.includes(x));
}

function hasAt(s: string): boolean {
  return ["[@", "(@", "{@", "[at", "(at", "{at"].some((x) => s.includes(x));
}

function hasHttp(s: string): boolean {
  return ["hxxp", "h**p"].some((x) => s.includes(x));
}

/**
 * Remove defanged symbols from a string
 *
 * @param {string} s A string
 * @returns {string} A cleaned (aka refanged) string
 */
export function refang(s: string): string {
  if (hasDot(s)) {
    s = s.replace(DOT_RE, ".");
  }

  if (hasColon(s)) {
    s = s.replace(COLON_RE, ":");
  }

  if (hasSlash(s)) {
    s = s.replace(SLASH_RE, "/");
  }

  if (hasColonDoubleSlash(s)) {
    s = s.replace(COLON_SLASH_RE, "://");
  }

  if (hasAt(s)) {
    s = s.replace(AT_RE, "@");
  }

  if (hasHttp(s)) {
    s = s.replace(HTTP_RE, "http$1://");
  }

  return s;
}

export function unicodeToASCII(s: string): string {
  return punycode.toASCII(s);
}
