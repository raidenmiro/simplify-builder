/**
 * creates a digits list and sorts them in the desired sequence
 */
export function createUnits(config: { chunkSize: number; amount: number }) {
  const { chunkSize, amount } = config;

  const list = Array.from({ length: amount + 1 }, (_, d) => d).reverse();

  let l = 0,
    r = chunkSize - 1;

  while (r <= amount) {
    swap(list, l, r);

    l = r + 1;
    r += chunkSize;
  }

  return list.map(String);
}

function swap<T>(s: T[], i: number, j: number) {
  const temp = s[i];
  s[i] = s[j];
  s[j] = temp;
}
