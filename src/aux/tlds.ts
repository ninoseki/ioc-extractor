import * as fs from "fs";
import * as memoize from "memoizee";
import * as path from "path";

export function getTLDs(): string[] {
  const filePath = path.resolve(__dirname, "../data/tlds.txt");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split(/\r?\n/);
    return lines.filter((line) => line.length > 0);
  } catch (_err) {
    return [];
  }
}

const _getTLDRegExpString = (): string => {
  return getTLDs().join("|");
};

export const getTLDRegExpString = memoize(_getTLDRegExpString);
