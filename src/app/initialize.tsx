import {
  $expression,
  deleteOne,
  DIGITS_PALETTE,
  expressionChanged,
} from "~/entities/math/model";
import { Compute, DigitalUnits, Display, Operators } from "~/entities/math/ui";
import { builder } from "~/features/constructor/model";
import { computePressed } from "~/features/runtime/model";
import { OPERATORS } from "~/shared/lib/math-logic/parser/parser";
import { ctx } from "~/shared/lib/reatom/ctx";
import { reflect } from "~/shared/lib/reflect/reflect";

export function initialize() {
  builder.add(ctx, {
    component: reflect({
      view: Display,
      bind: {
        expression: $expression,
        backward: () => deleteOne(ctx),
      },
    }),
    label: "display",
  });

  builder.add(ctx, {
    component: reflect({
      view: Operators,
      bind: {
        operationsSet: OPERATORS,
        onPress: (operator) => expressionChanged(ctx, operator),
      },
    }),
    label: "operators",
  });

  builder.add(ctx, {
    component: reflect({
      view: DigitalUnits,
      bind: {
        palette: DIGITS_PALETTE,
        onPress: (digit) => expressionChanged(ctx, digit),
      },
    }),
    label: "units",
  });

  builder.add(ctx, {
    component: reflect({
      view: Compute,
      bind: {
        onPress: () => computePressed(ctx),
      },
    }),
    label: "compute",
  });

  return () => builder.clearAll(ctx);
}
