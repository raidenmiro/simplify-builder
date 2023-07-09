import { useItem, useSelectList } from "~/shared/lib/builder/use.select";
import { cx } from "~/shared/lib/merge.class";

import { builder, usedBlocks } from "../../model";

export function FilledCanvas() {
  return (
    <>
      {useSelectList(usedBlocks, (props) => (
        <Block id={props.id} />
      ))}
    </>
  );
}

export function Block({ id }: { id: string }) {
  const { component: Slot, label } = useItem(builder, id);

  const classes = cx([
    "flex justify-between",
    {
      "flex-wrap items-center gap-2": label === "units",
    },
  ]);

  return (
    <div className={classes}>
      <Slot />
    </div>
  );
}
