/**
 * Reject duplications from an array
 *
 * @export
 * @param {string[]} array An array of strings
 * @returns {string[]} A uniquified array of string
 */
export function dedup(array: string[]): string[] {
  const uniq = array.filter((x, i, self) => {
    return self.indexOf(x) === i;
  });
  return uniq;
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

/**
 * Remove defanged symbols from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string} A cleaned (aka refanged) string
 */
export function defang(s: string): string {
  return s
    .replace(/(\[|\(|\{)\.(\]|\)|\})/gi, ".")
    .replace(/(\[|\(|\{)\./gi, ".")
    .replace(/\.(\]|\)|\})/gi, ".")
    .replace(/\[:\]/gi, ":")
    .replace(/\\\./gi, ".")
    .replace(/\[\/\]/gi, "/")
    .replace(/hxxp(s?):\/\//gi, "http$1://")
    .replace(/h\*\*p(s?):\/\//gi, "http$1://")
    .replace(/(\[|\(|\{)(at|@)(\]|\)|\})/gi, "@")
    .replace(/(\[|\(|\{)dot(\]|\)|\})/gi, ".");
}

/**
 * Alias for defang
 *
 * @deprecated
 * @export
 * @param {string} s A string
 * @returns {string} A cleaned (aka refanged) string
 */
export function clean(s: string): string {
  return defang(s);
}
