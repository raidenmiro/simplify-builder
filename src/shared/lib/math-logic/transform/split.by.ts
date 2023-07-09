type Result = string;

export function splitBy(
  string: string,
  opts: { separator: string[] | string; includeSeparator?: boolean }
) {
  const { includeSeparator = true, separator } = opts;

  const match = Array.isArray(separator) ? separator : [separator];
  const result: Result[] = [];

  let l = 0,
    r = 0;

  while (r <= string.length) {
    if (!match.includes(string.charAt(r)) && r < string.length) {
      r++;
    } else {
      if (l !== r) result.push(string.slice(l, r));
      if (includeSeparator && string.charAt(r)) result.push(string.charAt(r));

      l = r + 1;
      r++;
    }
  }

  return result;
}
