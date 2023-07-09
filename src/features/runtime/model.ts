import { action, onUpdate } from "@reatom/framework";

import {
  $executeMode,
  $expression,
  ExecuteVariant,
} from "~/entities/math/model";
import {
  infixToPostfix,
  performPostfix,
  splitBy,
} from "~/shared/lib/math-logic";
import { OPERATORS } from "~/shared/lib/math-logic/parser/parser";

function safePerform(s: string) {
  try {
    const postfix = infixToPostfix(
      splitBy(s, { separator: Array.from(OPERATORS) })
    );
    return performPostfix(postfix);
  } catch (error) {
    return null;
  }
}

export const switchToRuntime = action((ctx) => {
  $executeMode(ctx, ExecuteVariant.Runtime);
}, "switchToRuntime");

export const computePressed = action("computePressed");

onUpdate(computePressed, (ctx) => {
  const expression = ctx.get($expression).replaceAll(",", ".");
  const answer = safePerform(expression);
  if (answer != null) {
    $expression(ctx, String(answer));
  }
});
