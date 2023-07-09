/**
 * handle unary minus and insert 0 before operation
 * @example
 * ```ts
 * const result = handleUnaryMinus(['-', '5', '-', 5]);
 * console.log(result) // ['(', '0', '-', '5', ')', '-', '5']
 * ```
 */
export function handleUnaryMinus(
  expression: string[],
  parentheses = ["(", ")"],
  inject = "0"
) {
  const [open, close] = parentheses;
  const result = [];

  let prev: undefined | string,
    injected = false;

  for (const current of expression) {
    const expression = current.replace(",", ".");

    if (typeof prev === "undefined" && current === "-") {
      result.push(open);
      result.push(inject);
      result.push(expression);
      injected = true;
    } else if (injected) {
      result.push(expression);
      result.push(close);
      injected = false;
    } else {
      result.push(expression);
    }

    prev = expression;
  }

  return result;
}
