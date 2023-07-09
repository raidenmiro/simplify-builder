import { action } from "@reatom/framework";
import type { JSX } from "preact/jsx-runtime";

import { $executeMode, ExecuteVariant } from "~/entities/math/model";
import { createBuilder, createSelection } from "~/shared/lib/builder";
import { uid } from "~/shared/lib/uid";

interface Block {
  component(): JSX.Element;
  launched: boolean;
  used: boolean;
  label: string;
}

type Params = Omit<Block, "launched" | "used">;
export const builder = createBuilder<Block, Params>({
  convertInput: (input) => ({ ...input, launched: false, used: false }),
  keygen: () => `id-${uid()}`,
});

export const availableBlocks = createSelection(builder, (item) => !item.used);
export const usedBlocks = createSelection(builder, (item) => item.used);

export const switchToConstructor = action(
  (ctx) => $executeMode(ctx, ExecuteVariant.Constructor),
  "switchToConstructor"
);
