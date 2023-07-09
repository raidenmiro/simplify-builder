import type { Atom, Fn } from "@reatom/framework";
import type { JSX } from "preact";
import { createElement } from "preact";
import { useMemo } from "preact/hooks";

import { useAtom } from "../reatom";

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export const splitView = <
  State,
  Props extends Record<string, unknown>,
  Cases extends string
>(config: {
  match: Record<Cases, (state: State) => boolean> | ((state: State) => Cases);
  cases: AtLeastOne<Record<Cases, (props: Props) => JSX.Element>>;
  otherwise?: (props: Props) => JSX.Element;
  atom: Atom<State>;
}) => {
  const matchFn = isHandler(config.match)
    ? config.match
    : parseMatcher(config.match);

  return function (props: Props) {
    const state = useAtom(config.atom).value;
    const variant = useMemo(() => matchFn(state) ?? "", [state]);

    const defaultCase = config.otherwise;
    const elementProps = Object.assign({}, props, state);

    const component =
      variant in config.cases ? config.cases[variant as Cases] : defaultCase;

    if (!component) {
      return null;
    }

    return createElement(component, elementProps);
  };
};

function parseMatcher<S>(match: Record<string, (s: S) => boolean>) {
  const mathCases = Object.keys(match);

  return function matchCases(selected: S) {
    for (const variant of mathCases) {
      const checkSuitable = match[variant];

      if (checkSuitable(selected)) {
        return variant;
      }
    }
  };
}

const isHandler = (handler: unknown): handler is Fn => {
  return typeof handler === "function";
};
