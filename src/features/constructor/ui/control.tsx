import { ExecuteVariant } from "~/entities/math/model";
import { ctx } from "~/shared/lib/reatom/ctx";
import { Icon } from "~/shared/ui/icon";
import { ToggleGroup } from "~/shared/ui/toggle.group";

import { switchToConstructor } from "../model";

const ConstructorControl = () => {
  return (
    <ToggleGroup.Button
      value={ExecuteVariant.Constructor}
      onPress={() => switchToConstructor(ctx)}
    >
      <Icon className="h-4 w-4 stroke-black" variant="Switch" />
      <span>Constructor</span>
    </ToggleGroup.Button>
  );
};
ConstructorControl.displayName = "Constructor.Control";

export { ConstructorControl };
