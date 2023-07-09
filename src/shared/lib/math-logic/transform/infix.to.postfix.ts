type Operator = keyof typeof priorityList;
const priorityList = {
  "+": 1,
  "-": 1,
  "(": 0,
  ")": 0,
  "/": 2,
  x: 2,
};

function checkPriority(a: string, b: string) {
  return priorityList[a as Operator] <= priorityList[b as Operator];
}

/**
 * transform infix to postfix string
 * from - ['2', '+', '2']
 * into - ['2', '2', '+']
 */
export function infixToPostfix(expression: string[]) {
  const stack: string[] = [],
    postfix: string[] = [];

  for (const current of expression) {
    if (!(current in priorityList)) {
      postfix.push(current);
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
    } else {
      const last = stack[stack.length - 1];
      while (stack.length > 0 && checkPriority(current, last)) {
        postfix.push(stack.pop()!);
      }

      stack.push(current);
    }
  }

  while (stack.length > 0) postfix.push(stack.pop()!);

  return postfix;
}
