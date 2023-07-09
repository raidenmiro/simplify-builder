import { action, atom, onUpdate } from "@reatom/framework";

import { createUnits } from "~/shared/lib/math-logic";

export const DIGITS_PALETTE = createUnits({ chunkSize: 3, amount: 9 });

export enum ExecuteVariant {
  Runtime = "Runtime",
  Constructor = "Constructor",
}

export const $executeMode = atom(ExecuteVariant.Runtime, "$executeMode");

export const expressionChanged = action<string>("expressionChanged");
export const $expression = atom("", "$expression");

onUpdate(expressionChanged, (ctx, expression) => {
  const mode = ctx.get($executeMode);
  if (mode === ExecuteVariant.Runtime) {
    $expression(ctx, ctx.get($expression).concat(expression));
  }
});

export const deleteOne = action((ctx) => {
  const expression = ctx.get($expression);
  if (expression) {
    const theWithoutOne = expression.slice(0, -1);
    $expression(ctx, theWithoutOne);
  }
}, "deleteOne");
