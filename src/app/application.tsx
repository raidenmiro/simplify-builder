import "./application.css";

import { useEffect } from "preact/hooks";

import { $executeMode } from "~/entities/math/model";
import { Canvas, Sidebar } from "~/features/constructor/ui";
import { BoxCenter, PageLayout } from "~/shared/layouts";
import { useAtom } from "~/shared/lib/reatom";
import { ToggleGroup } from "~/shared/ui/toggle.group";

import { initialize } from "./initialize";

export function Application() {
  const mode = useAtom($executeMode).value;

  useEffect(initialize, []);

  return (
    <PageLayout>
      <ToggleGroup.Root defaultValue={mode} className="ml-auto mr-0">
        <div>First</div>
      </ToggleGroup.Root>
      <BoxCenter>
        <Sidebar />
        <Canvas />
      </BoxCenter>
    </PageLayout>
  );
}
