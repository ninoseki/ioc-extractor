
export function dedup(s: string): string {
  const list = s.split(/\s+/ig);
  const uniq = list.filter((x, i, self) => {
    return self.indexOf(x) === i;
  });
  return uniq.join(' ');
}

export function clean(s: string): string {
  return s.replace(/\[\.\]/ig, '.').
    replace(/\[\./ig, '.').
    replace(/\.\]/ig, '.').
    replace(/\(\.\)/ig, '.').
    replace(/\(\./ig, '.').
    replace(/\.\)/ig, '.');
}
