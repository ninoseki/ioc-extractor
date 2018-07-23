export function dedup(array: string[]): string[] {
  const uniq = array.filter((x, i, self) => {
    return self.indexOf(x) === i;
  });
  return uniq;
}

export function clean(s: string): string {
  return s.replace(/\[\.\]/ig, '.').
    replace(/\[\./ig, '.').
    replace(/\.\]/ig, '.').
    replace(/\(\.\)/ig, '.').
    replace(/\(\./ig, '.').
    replace(/\.\)/ig, '.').
    replace(/hxxp/ig, 'http');
}
