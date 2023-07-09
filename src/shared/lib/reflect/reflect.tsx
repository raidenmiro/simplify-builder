import type { Action, Atom } from "@reatom/framework";
import { combine } from "@reatom/framework";
import { createElement } from "preact";
import { useEffect, useLayoutEffect } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

import { useAtom } from "../reatom";
import { ctx } from "../reatom/ctx";

type View<Props> = (props: Props) => JSX.Element;

export interface Lifecycle {
  onBeforeMounted: Action;
  onUnMounted: Action;
  onMounted: Action;
}

export type BindableProps<Props> = {
  [Key in keyof Props]: Atom<Props[Key]> | Props[Key];
};

export function reflect<Props>(config: {
  bind: BindableProps<Props>;
  lifecycle?: Lifecycle;
  view: View<Props>;
}) {
  const { lifecycle, bind, view } = config;

  const atoms = {} as { [Key in keyof Props]: Atom<Props[Key]> };
  const props = {} as { [Key in keyof Props]: Props[Key] };

  for (const key in bind) {
    if (Object.hasOwn(bind, key)) {
      const value = bind[key];

      if (isAtom(value)) {
        atoms[key] = value;
      } else {
        props[key] = value as never; // 😈
      }
    }
  }

  const theShapeAtom = combine(atoms);

  return () => {
    const shape = useAtom(theShapeAtom).value;

    useLayoutEffect(() => {
      lifecycle?.onBeforeMounted(ctx);
    }, []);

    useEffect(() => {
      lifecycle?.onMounted(ctx);

      return () => {
        lifecycle?.onUnMounted(ctx);
      };
    }, []);

    return createElement(view, { ...shape, ...props });
  };
}

function isAtom(value: unknown): value is Atom {
  return typeof value === "function" && "__reatom" in value && "pipe" in value;
}
