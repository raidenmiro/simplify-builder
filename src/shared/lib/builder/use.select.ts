import type { Atom } from "@reatom/framework";
import type { JSX } from "preact/compat";
import { createElement, useMemo } from "preact/compat";

import { useAtom } from "~/shared/lib/reatom";

import type { Selection } from "./create.builder";

type AtomValue<T> = T extends Atom<infer R> ? R : never;

export const useSelectList = (
  selection: Selection,
  view: (props: { id: keyof AtomValue<Selection> }) => JSX.Element
) => {
  const map = useAtom(selection).value;
  const items = useMemo(() => {
    const keys = Object.keys(map);
    return keys.map((key) => map[key]) as Array<
      AtomValue<Selection>[keyof AtomValue<Selection>] & { id: string }
    >;
  }, [map]);

  return items.map((item) =>
    createElement(view, { key: item.id, id: item.id })
  );
};

export const useItem = <Shape extends Record<string, unknown>>(
  builder: Atom<{ ref: Shape }>,
  id: keyof Shape
) => {
  const kv = useAtom(builder).value;
  return kv.ref[id];
};
