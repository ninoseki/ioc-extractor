export function dedup(array: string[]): string[] {
  const uniq = array.filter((x, i, self) => {
    return self.indexOf(x) === i;
  });
  return uniq;
}

export function sortByValue(array: string[]): string[] {
  return array.sort();
}

export function clean(s: string): string {
  return s
    .replace(/\[\.\]/gi, ".")
    .replace(/\[\./gi, ".")
    .replace(/\.\]/gi, ".")
    .replace(/\(\.\)/gi, ".")
    .replace(/\(\./gi, ".")
    .replace(/\.\)/gi, ".")
    .replace(/\[:/gi, ":")
    .replace(/:\]/gi, ":")
    .replace(/\\\./gi, ".")
    .replace(/\[\/\]/gi, "/")
    .replace(/hxxp/gi, "http")
    .replace(/\[(at|@)\]/gi, "@")
    .replace(/\((at|@)\)/gi, "@");
}
