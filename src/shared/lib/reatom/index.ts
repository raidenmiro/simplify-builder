import { signal } from "@preact/signals";
import type { Atom, AtomState, Ctx, Fn, Rec } from "@reatom/framework";
import { addOnUpdate, atom } from "@reatom/framework";

import { ctx } from "./ctx";

const isShallowEqual = (a: unknown, b: unknown) => a === b;

export const useAtom = <T extends Atom>(atom: T): { value: AtomState<T> } => {
  const atomSignal = signal<AtomState<T>>(null as unknown as AtomState<T>);
  ctx.subscribe(atom, (newState) => (atomSignal.value = newState));
  return atomSignal;
};

type Combined<Shape extends Rec<Atom>> = {
  [K in keyof Shape]: AtomState<Shape[K]>;
};

export const combine = <Shape extends Rec<Atom>>(
  shape: Shape
): Atom<Combined<Shape>> => {
  const theAtom = atom((ctx, state = {} as Combined<Shape>) => {
    const newState = {} as Combined<Shape>;
    for (const key in shape) state[key] = ctx.spy(shape[key]!);
    return isShallowEqual(state, newState) ? state : newState;
  }, "theAtom");

  for (const name in shape)
    addOnUpdate(shape[name]!, (ctx) =>
      ctx.get((r, a) => {
        a!(ctx, theAtom.__reatom);
      })
    );

  return theAtom;
};
