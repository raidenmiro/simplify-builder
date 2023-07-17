import { OPERATORS } from "../parser/parser";

enum Priority {
  SANS = 0,
  LOW = 1,
  MIDDLE = 2,
  HIGH = 3,
}

export const UNARY_SYMBOL = "u";

type Operator = keyof typeof PRIORITY_SPEC;
const PRIORITY_SPEC = {
  "+": Priority.LOW,
  "-": Priority.LOW,
  "(": Priority.SANS,
  ")": Priority.SANS,
  "/": Priority.HIGH,
  "*": Priority.HIGH,
};

function checkPriority(a: string, b: string) {
  return PRIORITY_SPEC[a as Operator] <= PRIORITY_SPEC[b as Operator];
}

/**
 * transform infix to postfix string
 * from - ['2', '+', '2']
 * into - ['2', '2', '+']
 */
export function infixToPostfix(expression: string[]) {
  const stack: string[] = [],
    postfix: string[] = [];

  for (let i = 0; i < expression.length; i++) {
    const current = expression[i];
    const prev = expression[i - 1];

    if (!(current in PRIORITY_SPEC)) {
      postfix.push(current.trim());
      continue;
    }

    if (current === "(" || current === ")") {
      if (current === "(") {
        stack.push(current);
        continue;
      }

      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        postfix.push(stack.pop()!);
      }

      stack.pop();
      continue;
    }

    // handle case with unary minus
    if (current === "-" && (!prev || prev === "(" || OPERATORS.has(prev))) {
      postfix.push(UNARY_SYMBOL);
      continue;
    }

    const last = stack[stack.length - 1];
    while (stack.length > 0 && checkPriority(current, last)) {
      postfix.push(stack.pop()!);
    }

    stack.push(current);
  }

  while (stack.length > 0) postfix.push(stack.pop()!);

  return postfix;
}
