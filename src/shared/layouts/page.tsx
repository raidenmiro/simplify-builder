import type { JSX } from "preact/jsx-runtime";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export function PageLayout({ children }: Props) {
  return (
    <section className="m-auto mt-14 w-[540px] space-y-2">{children}</section>
  );
}
