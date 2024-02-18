/**
 * Reject duplications from an array
 *
 * @export
 * @param {string[]} array An array of strings
 * @returns {string[]} A set of strings
 */
export function dedup(array: string[]): string[] {
  return Array.from(new Set(array));
}

/**
 * Soar an array by value
 *
 * @export
 * @param {string[]} array An array of strings
 * @returns {string[]} A sorted array
 */
export function sortByValue(array: string[]): string[] {
  return array.sort();
}

function orRegExp(regexps: RegExp[]): RegExp {
  return new RegExp(regexps.map((r) => r.source).join("|"), "gi");
}

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
 * @export
 * @param {string} s A string
 * @returns {string} A cleaned (aka refanged) string
 */
export function refang(s: string): string {
  if (hasDot(s)) {
    s = s.replace(
      orRegExp([
        /\s\.\s/,
        /(\[|\(|\{)\.(\]|\)|\})/,
        /(\[|\(|\{)\./,
        /\.(\]|\)|\})/,
        /\\\./,
        /(\[|\(|\{)dot(\]|\)|\})/,
      ]),
      ".",
    );
  }

  if (hasColon(s)) {
    s = s.replace(/(\[|\(|\{)(:)(\]|\)|\})/gi, ":");
  }

  if (hasSlash(s)) {
    s = s.replace(/(\[|\(|\{)(\/)(\]|\)|\})/gi, "/");
  }

  if (hasColonDoubleSlash(s)) {
    s = s.replace(/(\[|\(|\{)(:\/\/)(\]|\)|\})/gi, "://");
  }

  if (hasAt(s)) {
    s = s.replace(/(\[|\(|\{)(at|@)(\]|\)|\})/gi, "@");
  }

  if (hasHttp(s)) {
    s = s.replace(/h(xx|\*\*)p(s?):\/\//gi, "http$2://");
  }

  return s;
}
