import { cx } from "class-variance-authority";

import { splitView } from "~/shared/lib/reflect/cases";

import { usedBlocks } from "../../model";
import { EmptyCanvas } from "./empty.canvas";
import { FilledCanvas } from "./filled.canvas";
import { CanvasLayout } from "./layout";

const emptyClasses = cx([
  "rounded-md border-2 border-dashed border-[#C4C4C4]",
  "flex items-center justify-center",
]);

export const Canvas = splitView({
  atom: usedBlocks,
  match: (blocks) => (isEmpty(blocks) ? "empty" : "filled"),
  cases: {
    empty: () => (
      <CanvasLayout className={emptyClasses}>
        <EmptyCanvas />
      </CanvasLayout>
    ),
    filled: () => (
      <CanvasLayout>
        <FilledCanvas />
      </CanvasLayout>
    ),
  },
});

const isEmpty = (list: Record<string, unknown>) => {
  return Object.keys(list).length === 0;
};
