import { Movement } from "~/features/constructor/ui/movement";
import { useSelectList } from "~/shared/lib/builder/use.select";

import { availableBlocks } from "../model";

const Sidebar = () => {
  return (
    <div className="mr-14 flex h-[448px] w-[240px] flex-col justify-between">
      {useSelectList(availableBlocks, (props) => (
        <Movement id={props.id} />
      ))}
    </div>
  );
};
Sidebar.displayName = "Constructor.Sidebar";

export { Sidebar };
