import { ExecuteVariant } from "~/entities/math/model";
import { ctx } from "~/shared/lib/reatom/ctx";
import { Icon } from "~/shared/ui/icon";
import { ToggleGroup } from "~/shared/ui/toggle.group";

import { switchToRuntime } from "../model";

const RuntimeControl = () => {
  return (
    <ToggleGroup.Button
      value={ExecuteVariant.Runtime}
      onPress={() => switchToRuntime(ctx)}
    >
      <Icon className="h-4 w-4 stroke-black" variant="Eye" />
      <span>Runtime</span>
    </ToggleGroup.Button>
  );
};

RuntimeControl.displayName = "Runtime.Control";

export { RuntimeControl };
