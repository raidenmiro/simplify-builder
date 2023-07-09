import type { JSXInternal } from "preact/src/jsx";

type FormEvent = JSXInternal.TargetedEvent<HTMLFormElement, Event>;

export function withPrevent(cb: (e: FormEvent) => void) {
  return (e: FormEvent) => {
    e.preventDefault();
    cb(e);
  };
}
