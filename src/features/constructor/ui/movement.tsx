import { useItem } from "~/shared/lib/builder/use.select";
import { cx } from "~/shared/lib/merge.class";
import { View } from "~/shared/ui/view";

import { builder } from "../model";

function classes(label: string) {
  return cx([
    "flex justify-between",
    {
      "flex-wrap items-center gap-2": label === "units",
    },
  ]);
}

export const Movement = ({ id, ...props }: { id: string }) => {
  const { component: Slot, label } = useItem(builder, id);

  const attributes = Object.assign({}, props);

  return (
    <View {...attributes} className={classes(label)}>
      <Slot />
    </View>
  );
};
Movement.displayName = "Movement";
