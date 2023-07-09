import type { JSX } from "preact/jsx-runtime";

interface Props {
  children: JSX.Element[];
}

export function BoxCenter({ children }: Props) {
  return <div className="flex items-center">{children}</div>;
}
