import type { Action, Atom } from "@reatom/framework";
import { action, atom } from "@reatom/framework";

type PossibleKey = string;

interface BuilderOpts<Item, Input, Key extends PossibleKey> {
  convertInput?: (input: Input) => Item;
  keygen: () => Key;
}

export function createBuilder<
  Item,
  Input,
  Key extends PossibleKey = PossibleKey
>({
  convertInput = (input: Input) => input as unknown as Item,
  keygen,
}: BuilderOpts<Item, Input, Key>) {
  type KV = Record<Key, Item & { id: string }>;

  const builderAtom = atom({ ref: {} } as { ref: KV }, "builderAtom");

  const addItem = action<[Input], Item & { id: string }>((ctx, item) => {
    const kv = ctx.get(builderAtom);
    const id = keygen();

    const body = { ...convertInput(item), id };
    kv.ref[id] = body;
    builderAtom(ctx, { ref: kv.ref });

    return body;
  }, "addItem");

  const removeItem = action<[Key], Key>((ctx, key) => {
    const prevState = ctx.get(builderAtom);
    const keys = Object.keys(prevState.ref);

    let kvChanged = false;
    for (const current of keys) {
      if (!(current in prevState.ref)) return key;

      kvChanged = true;
      delete prevState.ref[key];
    }

    if (!kvChanged) return key;
    builderAtom(ctx, { ref: prevState.ref });

    return key;
  }, "removeItem");

  const clearAll = action(
    (ctx) => builderAtom(ctx, { ref: {} as KV }),
    "clearAll"
  );

  return Object.assign(builderAtom, {
    remove: removeItem,
    add: addItem,
    clearAll,
  });
}

export type Selection = ReturnType<typeof createSelection>;

export function createSelection<Shape extends Record<string, unknown>>(
  builder: Atom<{ ref: Shape }>,
  map: (item: Shape[keyof Shape]) => boolean
) {
  const itemsAtom = atom((ctx) => {
    const items = ctx.spy(builder).ref;
    const bucket = {} as Shape;
    for (const key in items) {
      const prop = items[key];

      if (map(prop)) {
        bucket[key] = prop;
      }
    }

    return bucket;
  }, "itemsAtom");

  return Object.assign(itemsAtom, {
    size: atom((ctx) => Object.keys(ctx.spy(itemsAtom)).length, "size"),
  });
}

export function createSwitch<
  Shape extends Record<string, ReturnType<typeof createSelection>>
>(config: { initialCase: keyof Shape; cases: Shape }) {
  const { initialCase, cases } = config;

  const chosenCase = atom(initialCase, "chosenCase");
  const casesApi = {} as { [K: string]: Action };

  for (const variant in cases) {
    if (Object.hasOwn(cases, variant)) {
      const switchCurrent = action(
        (ctx) => chosenCase(ctx, variant),
        "switchCurrent"
      );

      casesApi[variant] = switchCurrent;
    }
  }

  const state = atom((ctx) => cases[ctx.spy(chosenCase)], "state");
  const keys = atom(Object.keys(cases), "keys");

  return Object.assign(state, {
    state: { chosenCase, keys },
    api: casesApi,
  });
}
