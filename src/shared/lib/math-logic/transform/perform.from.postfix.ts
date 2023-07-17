import { UNARY_SYMBOL } from "./infix.to.postfix";

const operation = {
  "+": (a: number, b: number) => b + a,
  "-": (a: number, b: number) => b - a,
  "/": (a: number, b: number) => b / a,
  "*": (a: number, b: number) => a * b,
};

type Digit = number;

export function performPostfix(postfix: string[]) {
  const stack: Digit[] = [];

  for (const current of postfix) {
    if (current === UNARY_SYMBOL) {
      const value = -Number(stack.pop()!);
      stack.push(value);
      continue;
    }

    if (!(current in operation)) {
      stack.push(Number(current));
    } else if (stack.length > 0 && current in operation) {
      const operator = operation[current as keyof typeof operation];
      stack.push(operator(stack.pop()!, stack.pop()!));
    }
  }

  return stack.pop() ?? 0;
}
